import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { ReviewLikeService } from '../application/reviwLike.service'

@Controller('reviewLike')
export class ReviewLikeController {
  constructor(private readonly reviewLikeService: ReviewLikeService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async likeReview(@Param('id') id: string, @Req() req) {
    const { user } = req
    return await this.reviewLikeService.testLike(user, Number(id))
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async cancelLikeReview(@Param('id') id: string, @Req() req) {
    const { user } = req
    return await this.reviewLikeService.cancelLike(user, Number(id))
  }

  @Get('/:id')
  async getReivewLikeList(@Param('id') id: string) {
    return await this.reviewLikeService.getReviewLikeList(Number(id))
  }
}
