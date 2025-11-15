import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const testQuestions: Question[] = [
  {
    id: 1,
    question: 'Какой метод исследования используется для изучения влияния света на рост растений?',
    options: [
      'Наблюдение',
      'Эксперимент',
      'Моделирование',
      'Анкетирование'
    ],
    correct: 1,
    explanation: 'Эксперимент позволяет изменять условия освещения и измерять влияние на рост растений.'
  },
  {
    id: 2,
    question: 'Что такое фитомодуль?',
    options: [
      'Система автополива растений',
      'Конструкция для вертикального озеленения помещений',
      'Удобрение для комнатных растений',
      'Датчик влажности почвы'
    ],
    correct: 1,
    explanation: 'Фитомодуль — это специальная конструкция для размещения растений в интерьере, часто вертикальная.'
  },
  {
    id: 3,
    question: 'Какой тип освещения наиболее эффективен для комнатных растений?',
    options: [
      'Лампы накаливания',
      'Светодиодные фитолампы',
      'Галогенные лампы',
      'Неоновые лампы'
    ],
    correct: 1,
    explanation: 'Светодиодные фитолампы обеспечивают оптимальный спектр света для фотосинтеза и энергоэффективны.'
  },
  {
    id: 4,
    question: 'Какая влажность воздуха оптимальна для большинства комнатных растений?',
    options: [
      '20-30%',
      '40-60%',
      '70-80%',
      '90-100%'
    ],
    correct: 1,
    explanation: 'Влажность 40-60% создаёт комфортные условия для роста большинства комнатных растений.'
  },
  {
    id: 5,
    question: 'Какой субстрат лучше использовать в фитомодулях?',
    options: [
      'Обычная садовая земля',
      'Гидропонный раствор',
      'Легкий торфяной субстрат',
      'Глинистая почва'
    ],
    correct: 2,
    explanation: 'Легкий торфяной субстрат обеспечивает хорошую аэрацию корней и удержание влаги в вертикальных конструкциях.'
  }
];

const courses = [
  {
    id: 1,
    title: 'Основы ботаники',
    description: 'Изучение строения растений, физиологии и систематики',
    duration: '12 недель',
    level: 'Базовый',
    students: 1250
  },
  {
    id: 2,
    title: 'Фитодизайн интерьеров',
    description: 'Создание зеленых композиций для жилых и офисных помещений',
    duration: '8 недель',
    level: 'Средний',
    students: 890
  },
  {
    id: 3,
    title: 'Гидропонные системы',
    description: 'Современные методы выращивания растений без почвы',
    duration: '10 недель',
    level: 'Продвинутый',
    students: 567
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'courses' | 'test'>('courses');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    testQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTestStarted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="GraduationCap" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-secondary">Академия</h1>
            </div>
            <nav className="flex gap-6">
              <button
                onClick={() => { setCurrentView('courses'); resetTest(); }}
                className={`flex items-center gap-2 font-semibold transition-colors ${
                  currentView === 'courses' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon name="BookOpen" size={20} />
                Курсы
              </button>
              <button
                onClick={() => setCurrentView('test')}
                className={`flex items-center gap-2 font-semibold transition-colors ${
                  currentView === 'test' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon name="ClipboardCheck" size={20} />
                Тестирование
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {currentView === 'courses' ? (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3">Каталог курсов</h2>
              <p className="text-lg text-muted-foreground">Выберите образовательную программу для изучения</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <Icon name="Clock" size={18} className="text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Продолжительность</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Студентов</span>
                        <span className="font-semibold">{course.students}</span>
                      </div>
                      <Button className="w-full mt-4">
                        Начать обучение
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto animate-fade-in">
            {!testStarted ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="ClipboardCheck" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Онлайн-тестирование</CardTitle>
                  <CardDescription className="text-base">
                    Проверка знаний по теме: Технология создания фитомодуля для интерьерного озеленения
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{testQuestions.length}</div>
                      <div className="text-sm text-muted-foreground">Вопросов</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">15</div>
                      <div className="text-sm text-muted-foreground">Минут</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">80%</div>
                      <div className="text-sm text-muted-foreground">Для сдачи</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Info" size={18} className="text-blue-600" />
                      Инструкция
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground ml-6 list-disc">
                      <li>Внимательно читайте каждый вопрос</li>
                      <li>Выберите один правильный ответ из предложенных вариантов</li>
                      <li>Вы можете вернуться к предыдущим вопросам</li>
                      <li>После завершения теста будут показаны результаты с пояснениями</li>
                    </ul>
                  </div>

                  <Button onClick={() => setTestStarted(true)} size="lg" className="w-full">
                    Начать тестирование
                  </Button>
                </CardContent>
              </Card>
            ) : showResults ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={40} className="text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Результаты тестирования</CardTitle>
                  <CardDescription className="text-base">Ваши ответы проверены</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(calculateScore(), testQuestions.length)}`}>
                      {calculateScore()} / {testQuestions.length}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Правильных ответов: {Math.round((calculateScore() / testQuestions.length) * 100)}%
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-bold text-xl">Разбор ответов</h3>
                    {testQuestions.map((q, index) => {
                      const isCorrect = selectedAnswers[index] === q.correct;
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 ${
                          isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}>
                          <div className="flex items-start gap-3 mb-2">
                            <Icon 
                              name={isCorrect ? 'CheckCircle2' : 'XCircle'} 
                              size={24} 
                              className={isCorrect ? 'text-green-600' : 'text-red-600'} 
                            />
                            <div className="flex-1">
                              <div className="font-semibold mb-1">Вопрос {index + 1}</div>
                              <div className="text-sm mb-2">{q.question}</div>
                              <div className="text-sm">
                                <span className="font-semibold">Ваш ответ: </span>
                                <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                  {q.options[selectedAnswers[index]]}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="text-sm mt-1">
                                  <span className="font-semibold">Правильный ответ: </span>
                                  <span className="text-green-700">{q.options[q.correct]}</span>
                                </div>
                              )}
                              <div className="text-sm mt-2 text-muted-foreground italic">
                                {q.explanation}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Button onClick={resetTest} variant="outline" className="w-full">
                    <Icon name="RotateCcw" size={18} className="mr-2" />
                    Пройти тест заново
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">
                      Вопрос {currentQuestion + 1} из {testQuestions.length}
                    </Badge>
                    <Progress value={((currentQuestion + 1) / testQuestions.length) * 100} className="w-40" />
                  </div>
                  <CardTitle className="text-2xl">{testQuestions[currentQuestion].question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={selectedAnswers[currentQuestion]?.toString()}
                    onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                  >
                    <div className="space-y-3">
                      {testQuestions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="flex-1"
                    >
                      <Icon name="ChevronLeft" size={18} className="mr-2" />
                      Назад
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                      className="flex-1"
                    >
                      {currentQuestion === testQuestions.length - 1 ? 'Завершить тест' : 'Далее'}
                      <Icon name="ChevronRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="border-t mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2024 Академия. Образовательная платформа для онлайн-обучения</p>
        </div>
      </footer>
    </div>
  );
}