import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';
import { ToastrService } from 'ngx-toastr';
import { Chapter } from '../intefaces/chapter';
import { Quest } from '../intefaces/quest';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  bookList = new Subject<Book[]>();
  chapterList = new Subject<Chapter[]>();
  questList = new Subject<Quest[]>();

  fetchAllBooks(): Subscription {
    return this.http
      .get(`${environment.apiUrl}/story`, { withCredentials: true })
      .subscribe(
        (data: Book[]) => {
          this.bookList.next(data);
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  fetchAllBookChapters(bookId: string): Subscription {
    return this.http
      .get(`${environment.apiUrl}/story/book/${bookId}`, {
        withCredentials: true,
      })
      .subscribe(
        (data: Chapter[]) => {
          data.sort((a, b) => {
            if (a.chapterNumber > b.chapterNumber) {
              return 1;
            }

            if (a.chapterNumber < b.chapterNumber) {
              return -1;
            }
          });

          this.chapterList.next(data);
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  fetchAllChapterQuests(chapterId: string): Subscription {
    return this.http
      .get(`${environment.apiUrl}/story/chapter/${chapterId}`, {
        withCredentials: true,
      })
      .subscribe(
        (data: Quest[]) => {
          this.questList.next(data);
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }
}
