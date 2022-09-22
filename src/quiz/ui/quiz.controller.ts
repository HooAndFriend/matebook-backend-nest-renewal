import { Controller } from '@nestjs/common'
import { QuizService } from '../application/quiz.service'

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
}
