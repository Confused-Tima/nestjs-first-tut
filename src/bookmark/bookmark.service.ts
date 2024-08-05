import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarDto, EditBookmarDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarkByID(userId: number, bookmarkId: number) {}

  createBookmark(userId: number, dto: CreateBookmarDto) {}

  getBookmarkIDs() {}

  editBookmarkByID(userId: number, dto: EditBookmarDto) {}

  deleteBookmarkByID(userId: number, bookmarkId: number) {}
}
