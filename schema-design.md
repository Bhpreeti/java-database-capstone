# Smart Clinic Schema Design

## MySQL Database Design

### Table: patients
- id: INT, Primary Key, AUTO_INCREMENT  
- name: VARCHAR(100), NOT NULL  
- email: VARCHAR(100), UNIQUE, NOT NULL  
- phone: VARCHAR(15), UNIQUE  
- created_at: DATETIME, DEFAULT CURRENT_TIMESTAMP  

### Table: doctors
- id: INT, Primary Key, AUTO_INCREMENT  
- name: VARCHAR(100), NOT NULL  
- specialization: VARCHAR(100)  
- email: VARCHAR(100), UNIQUE  
- phone: VARCHAR(15)  
- availability_status: BOOLEAN  

### Table: appointments
- id: INT, Primary Key, AUTO_INCREMENT  
- doctor_id: INT, Foreign Key → doctors(id)  
- patient_id: INT, Foreign Key → patients(id)  
- appointment_time: DATETIME, NOT NULL  
- status: ENUM('Scheduled','Completed','Cancelled')  
- notes: TEXT  

### Table: admin
- id: INT, Primary Key, AUTO_INCREMENT  
- username: VARCHAR(50), UNIQUE, NOT NULL  
- password: VARCHAR(255), NOT NULL  
- role: VARCHAR(50), DEFAULT 'ADMIN'  

> 💡 *Foreign key relationships ensure data integrity.  
> Deleting a patient could cascade to delete their appointments, depending on ON DELETE settings.*

---

## MongoDB Collection Design

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 51,
  "patientId": 101,
  "doctorId": 12,
  "medications": [
    {"name": "Paracetamol", "dosage": "500mg", "frequency": "6 hours"},
    {"name": "Cough Syrup", "dosage": "10ml", "frequency": "8 hours"}
  ],
  "doctorNotes": "Hydrate and rest for 2 days",
  "refillCount": 1,
  "createdAt": "2025-11-05T10:30:00Z"
}
