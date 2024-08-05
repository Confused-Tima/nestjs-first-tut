import { Body, Controller, Delete, Param, UseGuards } from '@nestjs/common';

import { JWTGuard } from 'src/auth/guards';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarDto, EditBookmarDto } from './dto';

@UseGuards(JWTGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get(':id')
  getBookmarkByID(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ) {}

  getBookmarkIDs() {}

  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarDto,
  ) {}

  editBookmarkByID(@GetUser('id') userId: number, @Body dto: EditBookmarDto) {}

  @Delete(':id')
  deleteBookmarkByID(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ) {}
}
