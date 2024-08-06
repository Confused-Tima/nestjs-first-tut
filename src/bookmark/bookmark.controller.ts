import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JWTGuard } from '../auth/guards';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarDto, EditBookmarDto } from './dto';

@UseGuards(JWTGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get(':id(\\d+)')
  getBookmarkByID(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkByID(userId, bookmarkId);
  }

  @Get('all')
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Post('create')
  createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarDto) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch('edit/:id')
  editBookmarkByID(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarDto,
  ) {
    return this.bookmarkService.editBookmarkByID(userId, bookmarkId, dto);
  }

  @Delete(':id')
  deleteBookmarkByID(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ) {
    this.bookmarkService.deleteBookmarkByID(userId, bookmarkId);
    return {
      status: 'Deleted',
    };
  }
}
