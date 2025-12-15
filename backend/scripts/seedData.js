// Vaccine seeding script for MongoDB using Mongoose
const mongoose = require('mongoose');
const Vaccine = require('../models/Vaccine');
require('dotenv').config();

const vaccines = [
	// 👶 Birth – 1 Year
	{ name: 'BCG', description: 'Protects against severe TB.', dosage: 'Single dose at birth', availability: new Date('2024-02-01'), location: 'Maternity Hospital', availableSlots: 20, price: 0, ageGroups: ['infant'], isActive: true },
	{ name: 'Hepatitis B', description: 'Prevents liver infection.', dosage: '3 doses: birth, 1 month, 6 months', availability: new Date('2024-02-01'), location: 'General Health Clinic', availableSlots: 30, price: 0, ageGroups: ['infant', 'child', 'adolescent', 'adult', 'senior'], isActive: true },
	{ name: 'Polio (OPV/IPV)', description: 'Prevents paralysis-causing virus.', dosage: '4 doses: 2, 4, 6-18 months, 4-6 years', availability: new Date('2025-02-01'), location: 'Pediatric Health Center', availableSlots: 25, price: 0, ageGroups: ['infant', 'child', 'adolescent', 'adult'], isActive: true },
	{ name: 'DTP (Diphtheria, Tetanus, Pertussis)', description: 'Combined protection.', dosage: '3 doses + booster', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 25, price: 0, ageGroups: ['infant', 'child', 'adolescent', 'adult'], isActive: true },
	{ name: 'Hib', description: 'Prevents meningitis, pneumonia.', dosage: '3-4 doses: 2, 4, 6, 12-15 months', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 20, price: 0, ageGroups: ['infant', 'child'], isActive: true },
	{ name: 'Rotavirus', description: 'Protects from severe diarrhea.', dosage: '2-3 doses: 2, 4, (6) months', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 20, price: 0, ageGroups: ['infant'], isActive: true },
	{ name: 'PCV', description: 'Protects from pneumonia & meningitis.', dosage: '4 doses: 2, 4, 6, 12-15 months', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 20, price: 0, ageGroups: ['infant', 'child', 'senior'], isActive: true },
	{ name: 'MMR', description: 'Measles, mumps, rubella (at 9 months, 2nd dose at 1-5 years).', dosage: '2 doses: 9-12 months, 15-18 months', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 20, price: 0, ageGroups: ['infant', 'child', 'adolescent', 'adult'], isActive: true },

	// 🧒 1 – 5 Years (child_1_5)
	{ name: 'Hepatitis A', description: 'Prevents hepatitis A infection.', dosage: '2 doses: 12-23 months, 6-18 months after first', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 15, price: 0, ageGroups: ['child_1_5'], isActive: true },
	{ name: 'Meningococcal', description: 'Prevents meningococcal disease.', dosage: '1 dose at 2 years', availability: new Date('2024-02-01'), location: 'General Health Clinic', availableSlots: 10, price: 0, ageGroups: ['child_1_5'], isActive: true },
	{ name: 'MMR (1-5)', description: 'Measles, mumps, rubella booster for 1-5 years.', dosage: 'Booster dose at 1-5 years', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 10, price: 0, ageGroups: ['child_1_5'], isActive: true },
	{ name: 'Varicella (Chickenpox)', description: 'Prevents chickenpox.', dosage: '1 dose at 12-15 months', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 10, price: 0, ageGroups: ['child_1_5'], isActive: true },
	{ name: 'Typhoid Conjugate', description: 'Prevents typhoid fever.', dosage: '1 dose at 2 years', availability: new Date('2024-02-01'), location: 'General Health Clinic', availableSlots: 10, price: 0, ageGroups: ['child_1_5'], isActive: true },
	{ name: 'Influenza (Flu, yearly)', description: 'Prevents seasonal flu.', dosage: '1 dose annually', availability: new Date('2024-02-01'), location: 'Community Health Center', availableSlots: 10, price: 0, ageGroups: ['child_1_5'], isActive: true },

	// 👧 5 – 10 Years (child_5_10)
	{ name: 'Japanese Encephalitis', description: 'Prevents Japanese Encephalitis.', dosage: '2 doses: 9 months and 16-24 months', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 12, price: 0, ageGroups: ['child_5_10'], isActive: true },
	{ name: 'Cholera', description: 'Prevents cholera infection.', dosage: '2 doses: 2 years and above', availability: new Date('2024-02-01'), location: 'General Health Clinic', availableSlots: 8, price: 0, ageGroups: ['child_5_10'], isActive: true },
	{ name: 'DTaP Booster', description: 'Diphtheria, Tetanus, Pertussis booster for 5-10 years.', dosage: 'Booster dose at 5-10 years', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 8, price: 0, ageGroups: ['child_5_10'], isActive: true },
	{ name: 'MMR Booster', description: 'Measles, mumps, rubella booster for 5-10 years.', dosage: 'Booster dose at 5-10 years', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 8, price: 0, ageGroups: ['child_5_10'], isActive: true },
	{ name: 'Varicella Booster', description: 'Chickenpox booster for 5-10 years.', dosage: 'Booster dose at 5-10 years', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 8, price: 0, ageGroups: ['child_5_10'], isActive: true },
	{ name: 'Polio Booster', description: 'Polio booster for 5-10 years.', dosage: 'Booster dose at 5-10 years', availability: new Date('2024-02-01'), location: 'Pediatric Health Center', availableSlots: 8, price: 0, ageGroups: ['child_5_10'], isActive: true },
	{ name: 'Typhoid Booster', description: 'Typhoid booster for 5-10 years.', dosage: 'Booster dose at 5-10 years', availability: new Date('2024-02-01'), location: 'General Health Clinic', availableSlots: 8, price: 0, ageGroups: ['child_5_10'], isActive: true },

	// 🧑 10 – 18 Years
	{ name: 'Tdap booster', description: 'Tetanus, diphtheria, whooping cough.', dosage: 'Single dose at 11-12 years', availability: new Date('2024-02-01'), location: 'Adolescent Health Center', availableSlots: 20, price: 0, ageGroups: ['adolescent', 'adult'], isActive: true },
	{ name: 'HPV (Human Papillomavirus)', description: 'Prevents cervical & other cancers.', dosage: '2-3 doses: 9-14 years, 15-26 years', availability: new Date('2024-02-01'), location: 'Adolescent Health Center', availableSlots: 20, price: 0, ageGroups: ['adolescent', 'adult'], isActive: true },

	// 👩‍🦱👨 18 – 50 Years
	{ name: 'Influenza (Flu, yearly)', description: 'Prevents seasonal flu.', dosage: '1 dose annually', availability: new Date('2024-02-01'), location: 'Community Health Center', availableSlots: 20, price: 0, ageGroups: ['adult', 'senior'], isActive: true },
	{ name: 'Td/Tdap booster', description: 'Tetanus & diphtheria protection (every 10 yrs).', dosage: 'Booster every 10 years', availability: new Date('2024-02-01'), location: 'General Health Clinic', availableSlots: 20, price: 0, ageGroups: ['adult', 'senior'], isActive: true },

	// 👵👴 50+ Years
	{ name: 'Pneumococcal (PCV / PPSV23)', description: 'Pneumonia & meningitis prevention.', dosage: '1-2 doses after age 50', availability: new Date('2024-02-01'), location: 'Senior Health Center', availableSlots: 20, price: 0, ageGroups: ['senior'], isActive: true },
	{ name: 'Shingles (Herpes Zoster)', description: 'Prevents painful nerve infection.', dosage: '2 doses after age 50', availability: new Date('2024-02-01'), location: 'Senior Health Center', availableSlots: 20, price: 0, ageGroups: ['senior'], isActive: true },
	{ name: 'COVID-19 booster', description: 'As per latest guidelines.', dosage: 'As per latest guidelines', availability: new Date('2024-02-01'), location: 'Community Health Center', availableSlots: 20, price: 0, ageGroups: ['adult', 'senior'], isActive: true },
];

async function seedVaccines() {
	await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
	await Vaccine.deleteMany({});
	await Vaccine.insertMany(vaccines);
	console.log(`Seeded ${vaccines.length} vaccines successfully.`);
	mongoose.disconnect();
}

if (require.main === module) {
	seedVaccines().catch(err => {
		console.error(err);
		mongoose.disconnect();
	});
}