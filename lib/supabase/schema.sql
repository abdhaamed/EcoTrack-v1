-- EcoTrack Reward System Schema
-- Run in Supabase SQL Editor

-- Drop existing tables (in reverse dependency order for safe re-runs)
DROP TABLE IF EXISTS reward_redemptions CASCADE;
DROP TABLE IF EXISTS point_transactions CASCADE;
DROP TABLE IF EXISTS rewards CASCADE;
DROP TABLE IF EXISTS waste_reports CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (linked to Supabase Auth)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(500) NOT NULL,
  full_name VARCHAR(255),
  avatar_url VARCHAR(500),
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  total_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url, total_points)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- WASTE REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS waste_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  waste_type VARCHAR(50) NOT NULL,
  weight_kg DECIMAL(10,2) NOT NULL,
  location VARCHAR(500),
  description TEXT,
  image_url VARCHAR(500),
  points_earned INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REWARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  points_required INTEGER NOT NULL CHECK (points_required > 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- POINT TRANSACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  report_id UUID REFERENCES waste_reports(id) ON DELETE SET NULL,
  transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('CREDIT', 'DEBIT')),
  points INTEGER NOT NULL CHECK (points > 0),
  description VARCHAR(500) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REWARD REDEMPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reward_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE RESTRICT,
  points_spent INTEGER NOT NULL CHECK (points_spent > 0),
  status VARCHAR(20) NOT NULL DEFAULT 'PROCESSING' CHECK (status IN ('PROCESSING', 'SHIPPED', 'COMPLETED')),
  delivery_address TEXT NOT NULL,
  tracking_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_waste_reports_user_id ON waste_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_waste_reports_status ON waste_reports(status);
CREATE INDEX IF NOT EXISTS idx_waste_reports_created_at ON waste_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_report_id ON point_transactions(report_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_created_at ON point_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reward_redemptions_user_id ON reward_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_redemptions_reward_id ON reward_redemptions(reward_id);
CREATE INDEX IF NOT EXISTS idx_reward_redemptions_status ON reward_redemptions(status);
CREATE INDEX IF NOT EXISTS idx_rewards_is_active ON rewards(is_active) WHERE is_active = true;

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_waste_reports_updated_at ON waste_reports;
CREATE TRIGGER update_waste_reports_updated_at
  BEFORE UPDATE ON waste_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_rewards_updated_at ON rewards;
CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON rewards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reward_redemptions_updated_at ON reward_redemptions;
CREATE TRIGGER update_reward_redemptions_updated_at
  BEFORE UPDATE ON reward_redemptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- Admins can view all profiles (using auth.users for role check to avoid recursion)
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- WASTE REPORTS POLICIES
-- Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON waste_reports FOR SELECT
  USING (user_id = auth.uid());

-- Users can create their own reports
CREATE POLICY "Users can create reports"
  ON waste_reports FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can update their own pending reports
CREATE POLICY "Users can update own reports"
  ON waste_reports FOR UPDATE
  USING (user_id = auth.uid() AND status = 'PENDING')
  WITH CHECK (user_id = auth.uid());

-- Admins can manage all reports
CREATE POLICY "Admins can manage reports"
  ON waste_reports FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- REWARDS POLICIES
-- Anyone can view active rewards
CREATE POLICY "Anyone can view active rewards"
  ON rewards FOR SELECT
  USING (is_active = true);

-- Only admins can manage rewards
CREATE POLICY "Admins can manage rewards"
  ON rewards FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- POINT TRANSACTIONS POLICIES
-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON point_transactions FOR SELECT
  USING (user_id = auth.uid());

-- Users can insert their own transactions (for CREDIT from waste reports)
CREATE POLICY "Users can insert own transactions"
  ON point_transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- System can insert transactions (for automatic point awards)
CREATE POLICY "Service role can insert transactions"
  ON point_transactions FOR INSERT
  WITH CHECK (
    auth.jwt()->>'role' = 'service_role'
  );

-- Admins can view all transactions
CREATE POLICY "Admins can view all transactions"
  ON point_transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- REWARD REDEMPTIONS POLICIES
-- Users can view their own redemptions
CREATE POLICY "Users can view own redemptions"
  ON reward_redemptions FOR SELECT
  USING (user_id = auth.uid());

-- Users can create redemptions
CREATE POLICY "Users can create redemptions"
  ON reward_redemptions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Admins can update redemptions (for status changes)
CREATE POLICY "Admins can update redemptions"
  ON reward_redemptions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get user balance
CREATE OR REPLACE FUNCTION get_user_points_balance(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  balance INTEGER;
BEGIN
  SELECT COALESCE(SUM(
    CASE
      WHEN transaction_type = 'CREDIT' THEN points
      WHEN transaction_type = 'DEBIT' THEN -points
      ELSE 0
    END
  ), 0) INTO balance
  FROM point_transactions
  WHERE user_id = p_user_id;
  
  RETURN balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and decrement reward stock (atomic)
CREATE OR REPLACE FUNCTION decrement_reward_stock(p_reward_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_stock INTEGER;
BEGIN
  SELECT stock INTO current_stock
  FROM rewards
  WHERE id = p_reward_id
  FOR UPDATE;

  IF current_stock IS NULL OR current_stock <= 0 THEN
    RETURN false;
  END IF;

  UPDATE rewards
  SET stock = stock - 1, updated_at = NOW()
  WHERE id = p_reward_id;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================
/*
INSERT INTO rewards (name, description, image_url, points_required, stock, is_active) VALUES
('Tumbler Minuman', 'Tumbler stainless steel ramah lingkungan 500ml', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', 500, 50, true),
('Tas Belanja Kanvas', 'Tas belanja lipat dari bahan kanvas alami', 'https://images.unsplash.com/photo-1544816155-12df9643f363', 750, 30, true),
('Botol Minum Aluminium', 'Botol minum aluminium 750ml dengan desain eco', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', 1000, 20, true),
('Senter LED Tenaga Surya', 'Lampu darurat LED dengan panel surya', 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d', 1500, 15, true),
('Keranjang Belanja Lipat', 'Keranjang belanja lipat untuk transportasi sehat', 'https://images.unsplash.com/photo-1544816155-12df9643f363', 2000, 10, true);
*/

-- ============================================
-- MIGRATION: Add total_points if missing (for existing databases)
-- ============================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'total_points'
  ) THEN
    ALTER TABLE profiles ADD COLUMN total_points INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;
