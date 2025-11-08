-- ================================
-- Stored Procedures for CMS Project
-- ================================

-- -------------------------------
-- 1. Daily Appointment Report by Doctor
-- -------------------------------
DELIMITER $$
CREATE PROCEDURE GetDailyAppointmentReportByDoctor(
    IN report_date DATE
)
BEGIN
    SELECT
        d.name AS doctor_name,
        a.appointment_time,
        a.status,
        p.name AS patient_name,
        p.phone AS patient_phone
    FROM
        appointment a
    JOIN
        doctor d ON a.doctor_id = d.id
    JOIN
        patient p ON a.patient_id = p.id
    WHERE
        DATE(a.appointment_time) = report_date
    ORDER BY
        d.name, a.appointment_time;
END$$
DELIMITER ;

-- Sample call (for testing)
-- CALL GetDailyAppointmentReportByDoctor('2025-05-01');

-- -------------------------------
-- 2. Doctor with Most Patients By Month
-- -------------------------------
DELIMITER $$
CREATE PROCEDURE GetDoctorWithMostPatientsByMonth(
    IN input_month INT,
    IN input_year INT
)
BEGIN
    SELECT
        d.name AS doctor_name,
        COUNT(a.patient_id) AS patients_seen
    FROM
        appointment a
    JOIN
        doctor d ON a.doctor_id = d.id
    WHERE
        MONTH(a.appointment_time) = input_month
        AND YEAR(a.appointment_time) = input_year
    GROUP BY
        d.id
    ORDER BY
        patients_seen DESC
    LIMIT 1;
END$$
DELIMITER ;

-- Sample call (for testing)
-- CALL GetDoctorWithMostPatientsByMonth(4, 2025);
