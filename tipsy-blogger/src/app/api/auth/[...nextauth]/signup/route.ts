import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../utils/connectMongoDB'; // Create this utility if not already present
import { IUser, User } from '../../../../../models/UserSchema'
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  // Basic validation
  if (!username || !email || !password) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  try {
    // Ensure MongoDB is connected
    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully.', user }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}
