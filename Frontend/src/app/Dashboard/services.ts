import { CodeService } from './services/code.service';
import { PackageService } from './services/package.service';
import { SubjectService } from './services/subject.service';
import { TrendingService } from './services/trending.service';
import { PreviewService } from './services/preview.service';
import { GiftCardService } from './services/gift-card.service';
import { EducationSystemService } from './services/education-system.service';
import { GradeService } from './services/grade.service';
import { PromoCodeService } from './services/promoCode.service';
import { DashboardAdminService } from './services/admin.service';
import { CourseService } from './services/course.service';
import { LessonService } from './services/lesson.service';
import { ChapterService } from './services/chapter.service';
import { TeacherService } from './services/teacher.service';

export const SERVICES = [
  TeacherService,
  DashboardAdminService,
  ChapterService,
  LessonService,
  CourseService,
  PromoCodeService,
  GradeService,
  EducationSystemService,
  GiftCardService,
  PreviewService,
  TrendingService,
  SubjectService,
  PackageService,
  CodeService,
];
