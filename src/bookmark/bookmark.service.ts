import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarDto, EditBookmarDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarkByID(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findUnique({
      where: { userId, id: bookmarkId },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarDto) {
    return await this.prisma.bookmark.create({
      data: { ...dto, userId },
    });
  }

  async getBookmarks(userId: number) {
    return await this.prisma.bookmark.findMany({ where: { userId } });
  }

  async editBookmarkByID(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarDto,
  ) {
    return await this.prisma.bookmark.update({
      where: { userId, id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkByID(userId: number, bookmarkId: number) {
    return await this.prisma.bookmark.delete({
      where: { userId, id: bookmarkId },
    });
  }
}
