import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService],
    });

    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quizzes', () => {
    const dummyQuizzes = {
      quizzes: [
        {
          title: 'Sample Quiz',
          icon: 'sample-icon.png',
          questions: [
            {
              question: 'Sample Question?',
              options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
              answer: 'Option 1',
            },
          ],
        },
      ],
    };

    service.getQuizzes().subscribe((quizzes) => {
      expect(quizzes).toEqual(dummyQuizzes);
    });

    const req = httpMock.expectOne('assets/data/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyQuizzes);
  });
});
