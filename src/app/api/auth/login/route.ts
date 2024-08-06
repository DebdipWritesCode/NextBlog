import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === 'user' && password === 'banao') {
    const user = { id: 1, username: 'user' };

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: 'strict',
      path: '/'
    });

    return NextResponse.json({ message: 'Login successful', user });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
