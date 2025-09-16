-- BLKOUT Liberation Platform - Creator Sovereignty Database Schema
-- 75% Minimum Revenue Share Mathematical Enforcement
-- Democratic Governance and Community Protection

-- ===== CREATOR SOVEREIGNTY TABLES =====

-- Creator revenue tracking with 75% minimum enforcement
CREATE TABLE creator_revenue_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL,
    content_id UUID NOT NULL,
    revenue_total DECIMAL(12,2) NOT NULL CHECK (revenue_total >= 0),
    creator_share DECIMAL(12,2) NOT NULL CHECK (creator_share >= 0),
    platform_share DECIMAL(12,2) NOT NULL CHECK (platform_share >= 0),
    community_share DECIMAL(12,2) NOT NULL CHECK (community_share >= 0),

    -- MATHEMATICAL ENFORCEMENT: Creator share must be >= 75%
    CONSTRAINT creator_sovereignty_75_percent CHECK (
        creator_share >= (revenue_total * 0.75)
    ),

    -- Ensure total adds up correctly
    CONSTRAINT revenue_total_consistency CHECK (
        revenue_total = creator_share + platform_share + community_share
    ),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Governance compliance tracking
    governance_approved BOOLEAN DEFAULT false,
    sovereignty_score DECIMAL(3,2) DEFAULT 0.75 CHECK (sovereignty_score >= 0.75),

    -- Audit trail
    created_by UUID NOT NULL,
    updated_by UUID,

    FOREIGN KEY (creator_id) REFERENCES creators(id),
    FOREIGN KEY (content_id) REFERENCES content_items(id)
);

-- Creator narrative control tracking
CREATE TABLE creator_narrative_control (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL,
    content_id UUID NOT NULL,

    -- Full editorial control indicators
    editorial_control_level DECIMAL(3,2) NOT NULL DEFAULT 1.0 CHECK (editorial_control_level >= 0.75),
    content_modification_consent BOOLEAN DEFAULT true,
    narrative_authority_preserved BOOLEAN DEFAULT true,

    -- Community protection aspects
    trauma_informed_approach BOOLEAN DEFAULT true,
    cultural_authenticity_maintained BOOLEAN DEFAULT true,
    anti_oppression_reviewed BOOLEAN DEFAULT false,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    FOREIGN KEY (creator_id) REFERENCES creators(id),
    FOREIGN KEY (content_id) REFERENCES content_items(id)
);

-- ===== DEMOCRATIC GOVERNANCE TABLES =====

-- Community member voting records
CREATE TABLE community_voting_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL,
    proposal_id UUID NOT NULL,
    vote_decision VARCHAR(20) NOT NULL CHECK (vote_decision IN ('approve', 'reject', 'abstain')),
    vote_weight DECIMAL(3,2) DEFAULT 1.0 CHECK (vote_weight = 1.0), -- One member, one vote enforcement

    -- Liberation principles validation
    liberation_values_considered BOOLEAN DEFAULT true,
    community_benefit_assessment TEXT,
    anti_oppression_impact_note TEXT,

    vote_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    vote_is_final BOOLEAN DEFAULT true,

    -- Audit and transparency
    vote_reason TEXT,
    publicly_visible BOOLEAN DEFAULT true,

    FOREIGN KEY (member_id) REFERENCES community_members(id),
    FOREIGN KEY (proposal_id) REFERENCES governance_proposals(id),

    -- Ensure one vote per member per proposal
    UNIQUE(member_id, proposal_id)
);

-- Governance proposals with liberation validation
CREATE TABLE governance_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    proposal_type VARCHAR(50) NOT NULL,

    -- Liberation values validation
    liberation_principles_score DECIMAL(3,2) NOT NULL CHECK (liberation_principles_score >= 0.0 AND liberation_principles_score <= 1.0),
    creator_sovereignty_impact DECIMAL(3,2) DEFAULT 0.0,
    community_protection_impact DECIMAL(3,2) DEFAULT 0.0,
    anti_oppression_review_passed BOOLEAN DEFAULT false,

    -- Democratic process tracking
    voting_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    voting_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    quorum_required INTEGER DEFAULT 10,
    quorum_met BOOLEAN DEFAULT false,

    -- Proposal status
    status VARCHAR(30) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'approved', 'rejected', 'withdrawn')),
    total_votes INTEGER DEFAULT 0,
    approve_votes INTEGER DEFAULT 0,
    reject_votes INTEGER DEFAULT 0,
    abstain_votes INTEGER DEFAULT 0,

    -- Community benefit assessment
    community_benefit_score DECIMAL(3,2) DEFAULT 0.0,
    potential_harm_assessment TEXT,
    mitigation_strategies TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL,

    FOREIGN KEY (created_by) REFERENCES community_members(id)
);

-- ===== COMMUNITY PROTECTION TABLES =====

-- Anti-oppression content review
CREATE TABLE anti_oppression_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL,
    reviewer_id UUID NOT NULL,

    -- Oppression detection
    oppression_detected BOOLEAN DEFAULT false,
    oppression_types TEXT[], -- Array of detected oppression types
    severity_level VARCHAR(20) CHECK (severity_level IN ('low', 'medium', 'high', 'critical')),
    confidence_score DECIMAL(3,2) DEFAULT 0.0,

    -- Community protection measures
    requires_content_warning BOOLEAN DEFAULT false,
    requires_community_discussion BOOLEAN DEFAULT false,
    automatic_rejection BOOLEAN DEFAULT false,

    -- Liberation principles assessment
    cultural_authenticity_score DECIMAL(3,2) DEFAULT 1.0,
    trauma_informed_score DECIMAL(3,2) DEFAULT 1.0,
    community_empowerment_score DECIMAL(3,2) DEFAULT 1.0,

    review_notes TEXT,
    recommendations TEXT[],

    reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    review_status VARCHAR(20) DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'requires_revision')),

    FOREIGN KEY (content_id) REFERENCES content_items(id),
    FOREIGN KEY (reviewer_id) REFERENCES community_members(id)
);

-- Community consent tracking
CREATE TABLE community_consent_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_subject_id UUID NOT NULL,
    data_type VARCHAR(100) NOT NULL,
    consent_type VARCHAR(50) NOT NULL CHECK (consent_type IN ('explicit', 'community_standard', 'implied')),

    -- Consent details
    consent_given BOOLEAN DEFAULT false,
    consent_date TIMESTAMP WITH TIME ZONE,
    consent_expiry_date TIMESTAMP WITH TIME ZONE,
    consent_scope TEXT NOT NULL,

    -- Community data sovereignty
    community_benefit_explained BOOLEAN DEFAULT false,
    data_sovereignty_preserved BOOLEAN DEFAULT true,
    withdrawal_mechanism_provided BOOLEAN DEFAULT true,

    -- Consent management
    consent_withdrawn BOOLEAN DEFAULT false,
    withdrawal_date TIMESTAMP WITH TIME ZONE,
    withdrawal_reason TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    FOREIGN KEY (data_subject_id) REFERENCES community_members(id)
);

-- ===== LIBERATION VALUES MONITORING =====

-- Real-time liberation metrics
CREATE TABLE liberation_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,4) NOT NULL,
    target_value DECIMAL(10,4) NOT NULL,

    -- Specific liberation tracking
    creator_sovereignty_percentage DECIMAL(5,2) DEFAULT 75.0 CHECK (creator_sovereignty_percentage >= 75.0),
    democratic_participation_rate DECIMAL(5,2) DEFAULT 0.0,
    community_protection_effectiveness DECIMAL(5,2) DEFAULT 0.0,
    anti_oppression_success_rate DECIMAL(5,2) DEFAULT 0.0,
    cultural_authenticity_score DECIMAL(5,2) DEFAULT 0.0,

    -- Measurement metadata
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    measurement_period VARCHAR(20) DEFAULT 'daily',
    data_source VARCHAR(100) NOT NULL,

    -- Health check integration
    health_check_passed BOOLEAN DEFAULT true,
    alert_triggered BOOLEAN DEFAULT false,
    alert_level VARCHAR(20) CHECK (alert_level IN ('info', 'warning', 'error', 'critical'))
);

-- ===== SUPPORTING TABLES =====

-- Creators table
CREATE TABLE creators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(200),

    -- Creator sovereignty settings
    minimum_revenue_share DECIMAL(3,2) DEFAULT 0.75 CHECK (minimum_revenue_share >= 0.75),
    narrative_control_required BOOLEAN DEFAULT true,
    community_engagement_level VARCHAR(20) DEFAULT 'active',

    -- Community membership
    community_member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    governance_participation_level VARCHAR(20) DEFAULT 'voting',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- Community members table
CREATE TABLE community_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(200),

    -- Democratic participation
    voting_rights_active BOOLEAN DEFAULT true,
    governance_role VARCHAR(50) DEFAULT 'member',
    community_joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Liberation values alignment
    liberation_values_training_completed BOOLEAN DEFAULT false,
    anti_oppression_training_completed BOOLEAN DEFAULT false,
    trauma_informed_interaction_training BOOLEAN DEFAULT false,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- Content items table
CREATE TABLE content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL,
    title VARCHAR(300) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_data JSONB NOT NULL,

    -- Liberation compliance
    liberation_review_status VARCHAR(30) DEFAULT 'pending',
    creator_sovereignty_verified BOOLEAN DEFAULT false,
    anti_oppression_cleared BOOLEAN DEFAULT false,
    community_protection_applied BOOLEAN DEFAULT false,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,

    FOREIGN KEY (creator_id) REFERENCES creators(id)
);

-- ===== INDEXES FOR PERFORMANCE =====

-- Creator sovereignty monitoring indexes
CREATE INDEX idx_creator_revenue_tracking_creator_id ON creator_revenue_tracking(creator_id);
CREATE INDEX idx_creator_revenue_tracking_sovereignty_score ON creator_revenue_tracking(sovereignty_score);
CREATE INDEX idx_creator_revenue_tracking_created_at ON creator_revenue_tracking(created_at);

-- Democratic governance indexes
CREATE INDEX idx_community_voting_records_member_id ON community_voting_records(member_id);
CREATE INDEX idx_community_voting_records_proposal_id ON community_voting_records(proposal_id);
CREATE INDEX idx_governance_proposals_status ON governance_proposals(status);
CREATE INDEX idx_governance_proposals_voting_dates ON governance_proposals(voting_start_date, voting_end_date);

-- Liberation metrics indexes
CREATE INDEX idx_liberation_metrics_type_date ON liberation_metrics(metric_type, measured_at);
CREATE INDEX idx_liberation_metrics_creator_sovereignty ON liberation_metrics(creator_sovereignty_percentage);
CREATE INDEX idx_liberation_metrics_health_check ON liberation_metrics(health_check_passed, alert_triggered);

-- ===== TRIGGERS FOR LIBERATION VALUES ENFORCEMENT =====

-- Trigger to ensure creator sovereignty compliance
CREATE OR REPLACE FUNCTION enforce_creator_sovereignty()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure creator share is at least 75%
    IF NEW.creator_share < (NEW.revenue_total * 0.75) THEN
        RAISE EXCEPTION 'Creator sovereignty violation: Creator share %.2f is below required 75%% of total %.2f',
            NEW.creator_share, NEW.revenue_total;
    END IF;

    -- Update sovereignty score
    NEW.sovereignty_score = NEW.creator_share / NEW.revenue_total;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_enforce_creator_sovereignty
    BEFORE INSERT OR UPDATE ON creator_revenue_tracking
    FOR EACH ROW EXECUTE FUNCTION enforce_creator_sovereignty();

-- Trigger to ensure democratic voting principles
CREATE OR REPLACE FUNCTION enforce_democratic_voting()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure vote weight is exactly 1.0 (one member, one vote)
    IF NEW.vote_weight != 1.0 THEN
        RAISE EXCEPTION 'Democratic voting violation: Vote weight must be exactly 1.0, got %.2f',
            NEW.vote_weight;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_enforce_democratic_voting
    BEFORE INSERT OR UPDATE ON community_voting_records
    FOR EACH ROW EXECUTE FUNCTION enforce_democratic_voting();

-- ===== VIEWS FOR LIBERATION MONITORING =====

-- Real-time creator sovereignty dashboard
CREATE VIEW creator_sovereignty_dashboard AS
SELECT
    c.username,
    c.display_name,
    AVG(crt.sovereignty_score) as avg_sovereignty_score,
    SUM(crt.revenue_total) as total_revenue,
    SUM(crt.creator_share) as total_creator_earnings,
    COUNT(crt.id) as revenue_transactions,
    MAX(crt.created_at) as last_revenue_date
FROM creators c
LEFT JOIN creator_revenue_tracking crt ON c.id = crt.creator_id
WHERE c.active = true
GROUP BY c.id, c.username, c.display_name;

-- Democratic participation metrics
CREATE VIEW democratic_participation_metrics AS
SELECT
    DATE_TRUNC('month', cvr.vote_timestamp) as month,
    COUNT(DISTINCT cvr.member_id) as unique_voters,
    COUNT(cvr.id) as total_votes,
    AVG(gp.liberation_principles_score) as avg_liberation_score,
    COUNT(CASE WHEN cvr.vote_decision = 'approve' THEN 1 END) as approve_votes,
    COUNT(CASE WHEN cvr.vote_decision = 'reject' THEN 1 END) as reject_votes
FROM community_voting_records cvr
JOIN governance_proposals gp ON cvr.proposal_id = gp.id
GROUP BY DATE_TRUNC('month', cvr.vote_timestamp)
ORDER BY month DESC;

-- Community protection effectiveness
CREATE VIEW community_protection_effectiveness AS
SELECT
    DATE_TRUNC('week', aor.reviewed_at) as week,
    COUNT(aor.id) as total_reviews,
    COUNT(CASE WHEN aor.oppression_detected = false THEN 1 END) as safe_content,
    COUNT(CASE WHEN aor.oppression_detected = true THEN 1 END) as flagged_content,
    AVG(aor.cultural_authenticity_score) as avg_cultural_authenticity,
    AVG(aor.trauma_informed_score) as avg_trauma_informed_score,
    AVG(aor.community_empowerment_score) as avg_empowerment_score
FROM anti_oppression_reviews aor
GROUP BY DATE_TRUNC('week', aor.reviewed_at)
ORDER BY week DESC;

-- ===== INITIAL DATA FOR LIBERATION VALUES =====

-- Insert default liberation metrics targets
INSERT INTO liberation_metrics (metric_type, metric_value, target_value, creator_sovereignty_percentage, data_source) VALUES
('creator_sovereignty_percentage', 75.0, 75.0, 75.0, 'mathematical_enforcement'),
('democratic_participation_rate', 0.0, 80.0, 75.0, 'voting_system'),
('community_protection_effectiveness', 0.0, 95.0, 75.0, 'anti_oppression_system'),
('anti_oppression_success_rate', 0.0, 98.0, 75.0, 'content_review_system'),
('cultural_authenticity_score', 0.0, 90.0, 75.0, 'community_feedback');

-- Grant permissions for staging environment
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO blkout_service;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO blkout_service;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO blkout_readonly;