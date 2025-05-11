'use server';

import Waitlist from '@/database/models/waitlist.model';
import { connectToDatabase } from '../mongoose';
import { revalidatePath } from 'next/cache';

export async function getWaitlistUsers(page = 1, limit = 10, searchQuery = '') {
  try {
    await connectToDatabase();

    const skipAmount = (page - 1) * limit;

    const query = searchQuery
      ? {
          $or: [
            { email: { $regex: searchQuery, $options: 'i' } },
            { username: { $regex: searchQuery, $options: 'i' } },
            { firstName: { $regex: searchQuery, $options: 'i' } },
          ],
        }
      : {};

    const waitlistUsers = await Waitlist.find(query)
      .sort({ signupDate: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalUsers = await Waitlist.countDocuments(query);

    const hasMore = totalUsers > skipAmount + waitlistUsers.length;

    return {
      users: JSON.parse(JSON.stringify(waitlistUsers)),
      totalUsers,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting waitlist users:', error);
    throw new Error('Failed to fetch waitlist users');
  }
}

export async function getWaitlistUserById(id: string) {
  try {
    await connectToDatabase();

    const user = await Waitlist.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error getting waitlist user:', error);
    throw new Error('Failed to fetch waitlist user');
  }
}

export async function updateWaitlistUser(
  id: string,
  updateData: { firstName?: string },
  path: string
) {
  try {
    await connectToDatabase();

    const updatedUser = await Waitlist.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error updating waitlist user:', error);
    throw new Error('Failed to update waitlist user');
  }
}

export async function getWaitlistStats() {
  try {
    await connectToDatabase();

    const totalUsers = await Waitlist.countDocuments();
    const lastWeekUsers = await Waitlist.countDocuments({
      signupDate: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    const topSources = await Waitlist.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    return {
      totalUsers,
      lastWeekUsers,
      topSources: JSON.parse(JSON.stringify(topSources)),
    };
  } catch (error) {
    console.error('Error getting waitlist stats:', error);
    throw new Error('Failed to fetch waitlist statistics');
  }
}
