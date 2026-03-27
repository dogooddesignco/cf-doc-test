CREATE TABLE patients (
  id            SERIAL PRIMARY KEY,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(30)  NOT NULL,
  date_of_birth DATE         NOT NULL,

  street        VARCHAR(255) NOT NULL,
  city          VARCHAR(100) NOT NULL,
  state         VARCHAR(10)  NOT NULL,
  zip           VARCHAR(20)  NOT NULL,

  insurance_id       VARCHAR(30)  NOT NULL,
  insurance_provider VARCHAR(100) NOT NULL,

  reason_for_visit TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_insurance ON patients(insurance_id);
