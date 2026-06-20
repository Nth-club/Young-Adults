import { images } from "./images";
export type LanguageType = 'en' | 'uz' | 'ru';

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      courses: "Courses",
      results: "Results",
      employees: "Staff",
      services: "Services"
    },
    hero: {
      motto: "Learning today,\nleading tomorrow",
      cta: "Register Now!"
    },
    about: {
      label: "About Us",
      title: "Who Are We?",
      description: "Young Adults Learning Center was founded in 2017 and currently operates 3 branches and 1 modern IT center. To date, our center has graduated over 8000 students and is recognized as the largest and leading supplementary education institution in the district. Currently, more than 2000 students are studying at our center, and over 80% of them have achieved B2 level or higher in English. In addition, more than 500 of our graduates are continuing their studies at some of the world’s most prestigious universities ranked in the Top 1000.",
      stats: [
        { value: "8000+", label: "Students" },
        { value: "8+",    label: "Courses" },
        { value: "4+",    label: "Branches" },
        { value: "95%",  label: "Success Rate" }
      ]
    },
    courses: {
      label: "Our Courses",
      title: "What We Teach",
      items: [
        {
          id: "computer",
          name: "Computer Literacy",
          desc: "Master essential computer skills, operating systems, and office suites for the digital age.",
          icon: "Monitor"
        },
        {
          id: "nat-lang",
          name: "Ona Tili (National Certificate)",
          desc: "Official Uzbek language preparation for national certification and university admission.",
          icon: "BookOpen"
        },
        {
          id: "eng-gram",
          name: "English Grammar",
          desc: "Structured English grammar from basics to advanced levels with immersive practice.",
          icon: "Languages"
        },
        {
          id: "cefr",
          name: "CEFR Pathway",
          desc: "Common European Framework of Reference — A1 to C2 preparation and certification pathway.",
          icon: "GraduationCap"
        },
        {
          id: "ielts",
          name: "IELTS Preparation",
          desc: "Intensive academic and general IELTS coaching targeting band 6.5 and above.",
          icon: "FileText"
        },
        {
          id: "foundation",
          name: "Foundation Course",
          desc: "Academic foundation bridging school curricula and prestigious university entries.",
          icon: "Layers"
        },
        {
          id: "backend",
          name: "Backend Development",
          desc: "Server-side programming, data models, APIs and algorithms with Python and Node.js.",
          icon: "Server"
        },
        {
          id: "frontend",
          name: "Frontend Development",
          desc: "Modern user interfaces and interactions using HTML5, CSS3, JavaScript, and React.",
          icon: "Code2"
        }
      ]
    },
    employees: {
      label: "Our Team",
      title: "Meet the Experts",
      items: [
              { name: "Yigitali Abdullaev",     role: "director",      photo: images.employees["01"] },
              { name: "Botir",                  role: "teacher",       photo: images.employees["02"] },
              { name: "Jahongir Pardayev",      role: "teacher",       photo: images.employees["03"] },
              { name: "Sarvar",                 role: "teacher",       photo: images.employees["04"] },
              { name: "Sadbarg Raxmonova",      role: "manager",       photo: images.employees["05"] },
              { name: "Iskandar Tojiyev",       role: "manager",       photo: images.employees["06"] },
              { name: "Maqsuda Karimovna",      role: "manager",       photo: images.employees["07"] },
              { name: "Abdulaziz Jamoliddinov", role: "teacher",       photo: images.employees["08"] },
              { name: "Elchin Tojimurodov",     role: "teacher",       photo: images.employees["09"] },
              { name: "Dildora",                role: "teacher",       photo: images.employees["10"] },
              { name: "Bekhruz Mansurov",       role: "it_teacher",    photo: images.employees["11"] },
              { name: "Odilbek Safarov",        role: "it_specialist", photo: images.employees["12"] },
              { name: "Jumayev Toshmirza",      role: "teacher",       photo: images.employees["13"] },
              { name: "Rasulbek Saidoov",       role: "manager",       photo: images.employees["14"] }
            ]
    },
    services: {
      label: "Services",
      title: "What We Offer",
      items: [
        { name: "Individual Lessons", desc: "1-on-1 personalized coaching tailored to your individual speed and learning goals." },
        { name: "Group Classes",      desc: "Collaborative interactive lessons in small cohorts for fast conversational skills." },
        { name: "Mock Exams",         desc: "Realistic, timed simulations of standard tests (IELTS, CEFR, State Certifications)." },
        { name: "Certificate Programs", desc: "Accredited, verifiable certificates awarded upon successful course completions." },
        { name: "Career Counseling",  desc: "Professional insights and counseling on higher education and job opportunities." }
      ]
    },
    location: {
      label: "Our Location",
      title: "Find Us",
      branches: [
        {
          id: "grammar",
          name: "Grammar Campus",
          address: "Located in Jarkurgan district, next to the Istiqlol wedding hall.",
          phone: "+998 90 295 70 07",
          mapUrl: "https://www.google.com/maps/place/37%C2%B030'23.3%22N+67%C2%B025'18.0%22E/@37.50648,67.42167,15z/data=!4m4!3m3!8m2!3d37.50648!4d67.42167?hl=ru&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
          embedUrl: "https://www.google.com/maps?q=37.50648,67.42167&z=15&output=embed"
        },
        {
          id: "ielts",
          name: "IELTS Campus",
          address: "Located next to the Zharkurgan district government building.",
          phone: "+998 90 295 70 07",
          mapUrl: "https://www.google.com/maps/place/37%C2%B030'48.0%22N+67%C2%B025'12.7%22E/@37.51333,67.42019,2426m/data=!3m1!1e3!4m4!3m3!8m2!3d37.51333!4d67.42019?hl=ru&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
          embedUrl: "https://www.google.com/maps?q=37.51333,67.42019&z=15&output=embed"
        },
        {
          id: "yangi-uz",
          name: "Yangi O'zbekiston Campus",
          address: "Located in the New Uzbekistan area, Zharkurgan district.",
          phone: "+998 90 295 70 07",
          mapUrl: "https://www.google.com/maps/place/37%C2%B032'57.4%22N+67%C2%B024'02.5%22E/@37.54927,67.40068,15z/data=!4m4!3m3!8m2!3d37.54927!4d67.40068?hl=ru-RU&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
          embedUrl: "https://www.google.com/maps?q=37.54927,67.40068&z=15&output=embed"
        }
      ]
    },
    modal: {
      title: "Get in Touch",
      subtitle: "Sign up for a free consultation or enroll in a course. Our manager will call you back within 15 minutes.",
      fullName: "Full Name",
      fullNamePl: "Enter your first and last name",
      phone: "Phone Number",
      phonePl: "e.g., +998 (90) 123-4567",
      course: "Select Course",
      branch: "Select Campus / Branch",
      submit: "Submit Registration",
      successMsg: "Thank you! Your registration has been received successfully. We will call you soon!",
      close: "Close"
    },
    results: {
      label: "Our Results",
      title: "Student Achievements",
      subtitle: "Real results from our students",
      filterAll: "All"
    },
    signup: "Sign Up",
    footer: "© 2026 Young Adults. All rights reserved."
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      about: "Biz haqimizda",
      courses: "Kurslar",
      results: "Natijalar",
      employees: "Xodimlar",
      services: "Xizmatlar"
    },
    hero: {
      motto: "Bugun o'rgan,\nertaga yetakla",
      cta: "Ro'yxatdan o'ting!"
    },
    about: {
      label: "Biz haqimizda",
      title: "Biz kimiz?",
      description: "Young Adults Learning Center 2017-yilda tashkil etilgan bo‘lib, hozirda 3 ta filial va 1 ta zamonaviy IT markaz faoliyat yuritadi. Bugungi kunga qadar markazimizni 8000 dan ortiq o‘quvchi tamomlagan va u tumandagi eng yirik hamda yetakchi qo‘shimcha ta’lim muassasalaridan biri sifatida tan olingan. Hozirda markazimizda 2000 dan ortiq o‘quvchi tahsil olmoqda va ularning 80% dan ortig‘i ingliz tilidan B2 daraja yoki undan yuqori natijaga erishgan. Bundan tashqari, 500 dan ortiq bitiruvchilarimiz dunyoning TOP-1000 talikka kiruvchi nufuzli universitetlarida o‘qishni davom ettirmoqda.",
      stats: [
        { value: "8000+", label: "O'quvchilar" },
        { value: "8+",    label: "Kurslar" },
        { value: "4+",    label: "Filiallar" },
        { value: "95%",  label: "Muvaffaqiyat" }
      ]
    },
    courses: {
      label: "Kurslarimiz",
      title: "Nima o'rgatamiz",
      items: [
        {
          id: "computer",
          name: "Kompyuter savodxonligi",
          desc: "Raqamli asrda eng muhim kompyuter dasturlari va operatsion tizimlar bilan ishlashni egallang.",
          icon: "Monitor"
        },
        {
          id: "nat-lang",
          name: "Ona Tili (Milliy sertifikat)",
          desc: "Milliy sertifikat va davlat o'qish imtihonlariga tayyorlovchi professional o'zbek tili kursi.",
          icon: "BookOpen"
        },
        {
          id: "eng-gram",
          name: "Ingliz tili grammatikasi",
          desc: "Boshlang'ichdan yuqori darajagacha tizimli, qiziqarli va mukammal grammatika darslari.",
          icon: "Languages"
        },
        {
          id: "cefr",
          name: "CEFR Kurslari",
          desc: "Yevropa umumiy til standarti bo'yicha A1 dan C2 darajagacha tizimli tayyorgarlik va sertifikat.",
          icon: "GraduationCap"
        },
        {
          id: "ielts",
          name: "IELTS tayyorlov",
          desc: "Akademik va umumiy IELTS imtihonlari uchun 6.5+ band natijani maqsad qilgan intensiv o'quv.",
          icon: "FileText"
        },
        {
          id: "foundation",
          name: "Foundation kursi",
          desc: "Maktab dasturi va nufuzli xalqaro universitetlar fanlarini bog'lovchi akademik tayyorgarlik.",
          icon: "Layers"
        },
        {
          id: "backend",
          name: "Backend dasturlash",
          desc: "Server dasturiy ta'minoti, ma'lumotlar bazasi va APIlarni Python hamda Node.js orqali o'rganing.",
          icon: "Server"
        },
        {
          id: "frontend",
          name: "Frontend dasturlash",
          desc: "HTML, CSS, JavaScript va eng zamonaviy React kutubxonasi yordamida interaktiv veb-sahifalar yaratish.",
          icon: "Code2"
        }
      ]
    },
    employees: {
      label: "Jamoamiz",
      title: "Mutaxassislar bilan tanishing",
      items: [
                    { name: "Yigitali Abdullaev",     role: "direktor",             photo: images.employees["01"] },
                    { name: "Botir",                  role: "o'qituvchi",           photo: images.employees["02"] },
                    { name: "Jahongir Pardayev",      role: "o'qituvchi",           photo: images.employees["03"] },
                    { name: "Sarvar",                 role: "o'qituvchi",           photo: images.employees["04"] },
                    { name: "Sadbarg Raxmonova",      role: "menejer",              photo: images.employees["05"] },
                    { name: "Iskandar Tojiyev",       role: "menejer",              photo: images.employees["06"] },
                    { name: "Maqsuda Karimovna",      role: "menejer",              photo: images.employees["07"] },
                    { name: "Abdulaziz Jamoliddinov", role: "o'qituvchi",           photo: images.employees["08"] },
                    { name: "Elchin Tojimurodov",     role: "o'qituvchi",           photo: images.employees["09"] },
                    { name: "Dildora",                role: "o'qituvchi",           photo: images.employees["10"] },
                    { name: "Bekhruz Mansurov",       role: "IT o'qituvchisi",      photo: images.employees["11"] },
                    { name: "Odilbek Safarov",        role: "IT mutaxassisi",       photo: images.employees["12"] },
                    { name: "Jumayev Toshmirza",      role: "o'qituvchi",           photo: images.employees["13"] },
                    { name: "Rasulbek Saidoov",       role: "menejer",              photo: images.employees["14"] }
                  ]
    },
    services: {
      label: "Xizmatlar",
      title: "Nima taklif etamiz",
      items: [
        { name: "Individual darslar", desc: "Sizning shaxsiy o'zlashtirish tezligingiz va maqsadingizga yo'naltirilgan 1-ga-1 darslar." },
        { name: "Guruh darslari",     desc: "Kichik guruhlarda muloqot va hamkorlikda tezroq natijaga erishish ta'limi." },
        { name: "Onlayn ta'lim",       desc: "Istalgan joydan dars videolarini ko'rish va topshiriqlarni yuklash imkoniyati." },
        { name: "Sinov imtihonlari",  desc: "Haqiqiy imtihon muhitini simulyatsiya qiluvchi muntazam IELTS va CEFR testlari." },
        { name: "Sertifikat dasturlari", desc: "Kurslarni muvaffaqiyatli yakunlaganingizni tasdiqlovchi rasmiy sertifikatlar." },
        { name: "Karyera maslahati",  desc: "O'qish yo'nalishini tanlash va ta'lim grantlarini yutib olish bo'yicha maslahatlar." }
      ]
    },
    location: {
      label: "Manzilimiz",
      title: "Bizni toping",
      branches: [
              {
                id: "grammar",
                name: "Grammar kampusi",
                address: "Jarqo'rg'on tumani, 'Istiqlol' to'yxonasi yonida joylashgan.",
                phone: "+998 90 295 70 07",
                mapUrl: "https://www.google.com/maps/place/37%C2%B030'23.3%22N+67%C2%B025'18.0%22E/@37.50648,67.42167,15z/data=!4m4!3m3!8m2!3d37.50648!4d67.42167?hl=ru&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
                embedUrl: "https://www.google.com/maps?q=37.50648,67.42167&z=15&output=embed"
              },
              {
                id: "ielts",
                name: "IELTS kampusi",
                address: "Jarqo'rg'on tumani hokimiyati binosi yonida joylashgan.",
                phone: "+998 90 295 70 07",
                mapUrl: "https://www.google.com/maps/place/37%C2%B030'48.0%22N+67%C2%B025'12.7%22E/@37.51333,67.42019,2426m/data=!3m1!1e3!4m4!3m3!8m2!3d37.51333!4d67.42019?hl=ru&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
                embedUrl: "https://www.google.com/maps?q=37.51333,67.42019&z=15&output=embed"
              },
              {
                id: "yangi-uz",
                name: "Yangi O'zbekiston kampusi",
                address: "Jarqo'rg'on tumani, Yangi O'zbekiston massivida joylashgan.",
                phone: "+998 90 295 70 07",
                mapUrl: "https://www.google.com/maps/place/37%C2%B032'57.4%22N+67%C2%B024'02.5%22E/@37.54927,67.40068,15z/data=!4m4!3m3!8m2!3d37.54927!4d67.40068?hl=ru-RU&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
                embedUrl: "https://www.google.com/maps?q=37.54927,67.40068&z=15&output=embed"
              }
            ]
    },
    modal: {
      title: "Ro'yxatdan o'tish",
      subtitle: "Bepul maslahat yoki kurs uchun ro'yxatdan oling. Administratorimiz 15 daqiqa ichida aloqaga chiqadi.",
      fullName: "To'liq ismingiz",
      fullNamePl: "Ism va familiyangizni kiriting",
      phone: "Telefon raqamingiz",
      phonePl: "Masalan: +998 (90) 123-4567",
      course: "Kursni tanlang",
      branch: "Filialni tanlang",
      submit: "Ariza jo'natish",
      successMsg: "Rahmat! Arizangiz muvaffaqiyatli qabul qilindi. Tez orada qo'ng'iroq qilamiz!",
      close: "Yopish"
    },
    results: {
      label: "Natijalarimiz",
      title: "O'quvchi yutuqlari",
      subtitle: "Bizning o'quvchilarimizdan haqiqiy natijalar",
      filterAll: "Barchasi"
    },
    signup: "A'zo bo'lish",
    footer: "© 2026 Young Adults. Barcha huquqlar himoyalangan."
  },
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      courses: "Курсы",
      results: "Результаты",
      employees: "Сотрудники",
      services: "Услуги"
    },
    hero: {
      motto: "Учись сегодня,\nлидируй завтра",
      cta: "Записаться сейчас!"
    },
    about: {
      label: "О нас",
      title: "Кто мы?",
      description: "Young Adults — это современный образовательный центр в Узбекистане, предлагающий профессиональные курсы по IT-технологиям, иностранным языкам и цифровым навыкам. Мы готовим следующее поколение лидеров с качественными проектными программами.",
      stats: [
        { value: "8000+", label: "Студентов" },
        { value: "8+",    label: "Курсов" },
        { value: "4+",    label: "Филиалов" },
        { value: "95%",  label: "Успеваемость" }
      ]
    },
    courses: {
      label: "Наши курсы",
      title: "Чему мы учим",
      items: [
        {
          id: "computer",
          name: "Компьютерная грамотность",
          desc: "Освойте ключевые компьютерные навыки, операционные системы и офисные программы для цифровой эпохи.",
          icon: "Monitor"
        },
        {
          id: "nat-lang",
          name: "Ona Tili (Нац. сертификат)",
          desc: "Профессиональная подготовка по узбекскому языку для сдачи национального сертификата и госэкзаменов.",
          icon: "BookOpen"
        },
        {
          id: "eng-gram",
          name: "Грамматика английского",
          desc: "Структурированные уроки английской грамматики от начального до продвинутого уровня с практикой речи.",
          icon: "Languages"
        },
        {
          id: "cefr",
          name: "Подготовка к CEFR",
          desc: "Общеевропейская шкала языковой компетенции — поэтапное обучение от уровня A1 до C2 с выдачей сертификата.",
          icon: "GraduationCap"
        },
        {
          id: "ielts",
          name: "Подготовка к IELTS",
          desc: "Интенсивный курс подготовки к академическому и общему IELTS с акцентом на балл 6.5 и выше.",
          icon: "FileText"
        },
        {
          id: "foundation",
          name: "Академический Foundation",
          desc: "Мост между школьной программой и обучением в ведущих международных университетах.",
          icon: "Layers"
        },
        {
          id: "backend",
          name: "Backend-разработка",
          desc: "Серверное программирование, проектирование баз данных и разработка API на Python и Node.js.",
          icon: "Server"
        },
        {
          id: "frontend",
          name: "Frontend-разработка",
          desc: "Создание интерактивных и отзывчивых веб-интерфейсов с помощью HTML, CSS, JavaScript и React.",
          icon: "Code2"
        }
      ]
    },
    employees: {
      label: "Наша команда",
      title: "Познакомьтесь с экспертами",
      items: [
                    { name: "Yigitali Abdullaev",     role: "директор",             photo: images.employees["01"] },
                    { name: "Botir",                  role: "учитель",              photo: images.employees["02"] },
                    { name: "Jahongir Pardayev",      role: "учитель",              photo: images.employees["03"] },
                    { name: "Sarvar",                 role: "учитель",              photo: images.employees["04"] },
                    { name: "Sadbarg Raxmonova",      role: "менеджер",             photo: images.employees["05"] },
                    { name: "Iskandar Tojiyev",       role: "менеджер",             photo: images.employees["06"] },
                    { name: "Maqsuda Karimovna",      role: "менеджер",             photo: images.employees["07"] },
                    { name: "Abdulaziz Jamoliddinov", role: "учитель",              photo: images.employees["08"] },
                    { name: "Elchin Tojimurodov",     role: "учитель",              photo: images.employees["09"] },
                    { name: "Dildora",                role: "учитель",              photo: images.employees["10"] },
                    { name: "Bekhruz Mansurov",       role: "преподаватель IT",     photo: images.employees["11"] },
                    { name: "Odilbek Safarov",        role: "IT-специалист",        photo: images.employees["12"] },
                    { name: "Jumayev Toshmirza",      role: "учитель",              photo: images.employees["13"] },
                    { name: "Rasulbek Saidoov",       role: "менеджер",             photo: images.employees["14"] }
                  ]
    },
    services: {
      label: "Услуги",
      title: "Что мы предлагаем",
      items: [
        { name: "Индивидуальные уроки", desc: "Персонализированное обучение один на один с учетом вашей скорости и целей." },
        { name: "Групповые занятия",    desc: "Интерактивные занятия в небольших группах для быстрого развития разговорных навыков." },
        { name: "Онлайн-обучение",      desc: "Гибкие дистанционные занятия с доступом к записям и учебным материалам из любой точки." },
        { name: "Пробные экзамены (Mock)", desc: "Ежемесячные симуляции IELTS и CEFR в реальной тестовой атмосфере под таймером." },
        { name: "Сертификационные курсы", desc: "Выдача официального подтвержденного сертификата об успешном завершении обучения." },
        { name: "Профориентация",       desc: "Академические консультации по выбору вуза, будущей специальности и получению грантов." }
      ]
    },
    location: {
      label: "Наше местоположение",
      title: "Найдите нас",
      branches: [
              {
                id: "grammar",
                name: "Кампус Grammar",
                address: "Расположен в Джаркурганском районе, рядом со свадебным залом 'Истиклол'.",
                phone: "+998 90 295 70 07",
                mapUrl: "https://www.google.com/maps/place/37%C2%B030'23.3%22N+67%C2%B025'18.0%22E/@37.50648,67.42167,15z/data=!4m4!3m3!8m2!3d37.50648!4d67.42167?hl=ru&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
                embedUrl: "https://www.google.com/maps?q=37.50648,67.42167&z=15&output=embed"
              },
              {
                id: "ielts",
                name: "Кампус IELTS",
                address: "Расположен рядом со зданием хокимията Джаркурганского района.",
                phone: "+998 90 295 70 07",
                mapUrl: "https://www.google.com/maps/place/37%C2%B030'48.0%22N+67%C2%B025'12.7%22E/@37.51333,67.42019,2426m/data=!3m1!1e3!4m4!3m3!8m2!3d37.51333!4d67.42019?hl=ru&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
                embedUrl: "https://www.google.com/maps?q=37.51333,67.42019&z=15&output=embed"
              },
              {
                id: "yangi-uz",
                name: "Кампус Янги Узбекистон",
                address: "Расположен в массиве 'Янги Узбекистон', Джаркурганский район.",
                phone: "+998 90 295 70 07",
                mapUrl: "https://www.google.com/maps/place/37%C2%B032'57.4%22N+67%C2%B024'02.5%22E/@37.54927,67.40068,15z/data=!4m4!3m3!8m2!3d37.54927!4d67.40068?hl=ru-RU&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
                embedUrl: "https://www.google.com/maps?q=37.54927,67.40068&z=15&output=embed"
              }
            ]
    },
    modal: {
      title: "Регистрация",
      subtitle: "Запишитесь на бесплатную консультацию или курс. Наш менеджер свяжется с вами в течение 15 минут.",
      fullName: "Полное имя",
      fullNamePl: "Введите ваше имя и фамилию",
      phone: "Номер телефона",
      phonePl: "Например: +998 (90) 123-4567",
      course: "Выберите курс",
      branch: "Выберите филиал",
      submit: "Отправить заявку",
      successMsg: "Спасибо! Ваша заявка успешно принята. Мы свяжемся с вами в ближайшее время!",
      close: "Закрыть"
    },
    results: {
      label: "Наши результаты",
      title: "Достижения студентов",
      subtitle: "Реальные результаты наших студентов",
      filterAll: "Все"
    },
    signup: "Регистрация",
    footer: "© 2026 Young Adults. Все права защищены."
  }
};
