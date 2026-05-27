require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const bcrypt = require('bcryptjs')
const { sequelize, User, Teacher, Community } = require('../models')

async function seed() {
  try {
    await sequelize.sync({ force: true })
    console.log('Database synced')

    const password = await bcrypt.hash('password123', 10)

    const student = await User.create({ name: 'Alex Johnson', email: 'student@rokkru.com', password, role: 'student' })
    const teacherUser = await User.create({ name: 'Dr. Phe Sophy', email: 'teacher@rokkru.com', password, role: 'teacher' })
    const admin = await User.create({ name: 'Super Admin', email: 'admin@rokkru.com', password, role: 'admin' })

    await Teacher.create({
      userId: teacherUser.id,
      major: 'Computer Science',
      subjects: ['JavaScript', 'React JS', 'Node JS'],
      location: 'Phnom Penh',
      bio: 'Experienced full-stack developer and educator with 8+ years of teaching.',
      experience: 8,
      rating: 4.8,
      reviewCount: 45,
      students: 120,
      price: 15,
    })

    await Community.create({ name: 'JavaScript Community', type: 'subject', description: 'Discuss JavaScript, share study tips, and learn with peers.', category: 'Technology', memberCount: 234 })
    await Community.create({ name: 'Computer Science Hub', type: 'major', description: 'Students and teachers in CS — share resources and grow together.', category: 'Technology', memberCount: 189 })

    console.log('Seed data created successfully')
    console.log('Test accounts: student@rokkru.com / teacher@rokkru.com / admin@rokkru.com (password: password123)')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
