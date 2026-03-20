"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Rocket, Clock, Star, Layers } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeEstimate: string;
  technologies: string[];
  steps: { title: string; description: string; code?: string }[];
}

const difficultyConfig = {
  beginner: { label: "入門", color: "#059669" },
  intermediate: { label: "中級", color: "#D97706" },
  advanced: { label: "上級", color: "#DC2626" },
};

const projects: Project[] = [
  {
    id: "todo-api",
    title: "TODO REST API",
    description: "Spring Boot で CRUD REST API を構築する入門プロジェクト。JPA、バリデーション、例外ハンドリングを学ぶ。",
    difficulty: "beginner",
    timeEstimate: "2-3時間",
    technologies: ["Spring Boot", "Spring Data JPA", "H2 Database", "Validation"],
    steps: [
      {
        title: "1. プロジェクト作成",
        description: "Spring Initializr で Spring Web, Spring Data JPA, H2 Database, Validation を選択してプロジェクトを生成します。",
        code: `// build.gradle.kts
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    runtimeOnly("com.h2database:h2")
}`,
      },
      {
        title: "2. エンティティ定義",
        description: "Todo エンティティを作成します。タイトル、完了フラグ、作成日時を持ちます。",
        code: `@Entity
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "タイトルは必須です")
    @Size(max = 200)
    private String title;

    private boolean completed = false;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // getter/setter 省略
}`,
      },
      {
        title: "3. リポジトリ & サービス",
        description: "Spring Data JPA のリポジトリインターフェースとビジネスロジック層を作成します。",
        code: `// Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompletedOrderByCreatedAtDesc(boolean completed);
}

// Service
@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository repository;

    public List<Todo> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Todo create(Todo todo) {
        return repository.save(todo);
    }

    public Todo toggleComplete(Long id) {
        Todo todo = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        todo.setCompleted(!todo.isCompleted());
        return repository.save(todo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}`,
      },
      {
        title: "4. REST コントローラ",
        description: "CRUD エンドポイントを実装します。",
        code: `@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService service;

    @GetMapping
    public List<Todo> list() {
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@Valid @RequestBody Todo todo) {
        return service.create(todo);
    }

    @PatchMapping("/{id}/toggle")
    public Todo toggle(@PathVariable Long id) {
        return service.toggleComplete(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}`,
      },
      {
        title: "5. テスト",
        description: "コントローラの統合テストを MockMvc で作成します。",
        code: `@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {
    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void createAndList() throws Exception {
        var todo = new Todo();
        todo.setTitle("テスト TODO");

        mockMvc.perform(post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(todo)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value("テスト TODO"));

        mockMvc.perform(get("/api/todos"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].title").value("テスト TODO"));
    }
}`,
      },
    ],
  },
  {
    id: "blog-app",
    title: "ブログアプリ",
    description: "Spring Boot + Thymeleaf で Web アプリを構築。認証、ページネーション、画像アップロードを実装する。",
    difficulty: "intermediate",
    timeEstimate: "5-8時間",
    technologies: ["Spring Boot", "Thymeleaf", "Spring Security", "JPA", "PostgreSQL"],
    steps: [
      {
        title: "1. プロジェクト構成",
        description: "Spring Boot + Thymeleaf + Security + JPA でブログの基盤を構築します。",
        code: `// build.gradle.kts
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity6")
    runtimeOnly("org.postgresql:postgresql")
}`,
      },
      {
        title: "2. エンティティ設計",
        description: "User, Post, Comment のエンティティとリレーションを定義します。",
        code: `@Entity
@Table(name = "posts")
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private User author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    private LocalDateTime publishedAt;
    private boolean published = false;
}`,
      },
      {
        title: "3. 認証設定",
        description: "Spring Security でユーザー登録・ログインを実装します。",
        code: `@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/posts/**", "/css/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login").permitAll()
            )
            .logout(logout -> logout.logoutSuccessUrl("/"))
            .build();
    }
}`,
      },
      {
        title: "4. コントローラ & テンプレート",
        description: "記事一覧・詳細・投稿画面のコントローラとThymeleafテンプレートを作成します。",
        code: `@Controller
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/")
    public String index(Model model,
                        @RequestParam(defaultValue = "0") int page) {
        Page<Post> posts = postService.findPublished(PageRequest.of(page, 10));
        model.addAttribute("posts", posts);
        return "index";   // templates/index.html
    }

    @GetMapping("/posts/{id}")
    public String show(@PathVariable Long id, Model model) {
        Post post = postService.findById(id);
        model.addAttribute("post", post);
        return "post/show";
    }

    @PostMapping("/posts")
    @PreAuthorize("isAuthenticated()")
    public String create(@Valid @ModelAttribute PostForm form,
                         @AuthenticationPrincipal UserDetails user) {
        Post post = postService.create(form, user.getUsername());
        return "redirect:/posts/" + post.getId();
    }
}`,
      },
    ],
  },
  {
    id: "batch-processing",
    title: "バッチ処理システム",
    description: "Spring Batch で CSV取込、データ変換、DB書込のバッチジョブを構築する。スケジューリングとエラーハンドリングを学ぶ。",
    difficulty: "advanced",
    timeEstimate: "4-6時間",
    technologies: ["Spring Boot", "Spring Batch", "JPA", "Scheduling"],
    steps: [
      {
        title: "1. Spring Batch 基本構成",
        description: "Job > Step > (Reader > Processor > Writer) の構成を理解し、設定します。",
        code: `@Configuration
public class ImportJobConfig {
    @Bean
    public Job importJob(JobRepository jobRepository, Step importStep) {
        return new JobBuilder("importJob", jobRepository)
            .incrementer(new RunIdIncrementer())
            .start(importStep)
            .build();
    }

    @Bean
    public Step importStep(JobRepository jobRepository,
                           PlatformTransactionManager tx,
                           ItemReader<CsvRecord> reader,
                           ItemProcessor<CsvRecord, Employee> processor,
                           ItemWriter<Employee> writer) {
        return new StepBuilder("importStep", jobRepository)
            .<CsvRecord, Employee>chunk(100, tx)
            .reader(reader)
            .processor(processor)
            .writer(writer)
            .faultTolerant()
            .skipLimit(10)
            .skip(ParseException.class)
            .build();
    }
}`,
      },
      {
        title: "2. CSV Reader",
        description: "FlatFileItemReader で CSV ファイルを読み込みます。",
        code: `@Bean
public FlatFileItemReader<CsvRecord> reader() {
    return new FlatFileItemReaderBuilder<CsvRecord>()
        .name("csvReader")
        .resource(new ClassPathResource("data/employees.csv"))
        .delimited()
        .names("name", "email", "department", "salary")
        .targetType(CsvRecord.class)
        .linesToSkip(1)  // ヘッダー行をスキップ
        .build();
}`,
      },
      {
        title: "3. Processor & Writer",
        description: "データ変換ロジックとDB書込を実装します。",
        code: `@Component
public class EmployeeProcessor implements ItemProcessor<CsvRecord, Employee> {
    @Override
    public Employee process(CsvRecord item) {
        // バリデーション
        if (item.salary() < 0) return null;  // null = スキップ

        return Employee.builder()
            .name(item.name().trim())
            .email(item.email().toLowerCase())
            .department(item.department())
            .salary(item.salary())
            .importedAt(LocalDateTime.now())
            .build();
    }
}

@Bean
public JpaItemWriter<Employee> writer(EntityManagerFactory emf) {
    JpaItemWriter<Employee> writer = new JpaItemWriter<>();
    writer.setEntityManagerFactory(emf);
    return writer;
}`,
      },
      {
        title: "4. スケジューリング",
        description: "定時実行でバッチジョブを自動起動します。",
        code: `@Component
@RequiredArgsConstructor
public class BatchScheduler {
    private final JobLauncher jobLauncher;
    private final Job importJob;

    @Scheduled(cron = "0 0 2 * * *")  // 毎日午前2時
    public void runImportJob() {
        try {
            JobParameters params = new JobParametersBuilder()
                .addLong("timestamp", System.currentTimeMillis())
                .toJobParameters();
            jobLauncher.run(importJob, params);
        } catch (Exception e) {
            log.error("バッチ実行エラー", e);
        }
    }
}`,
      },
    ],
  },
];

export default function ProjectsClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Rocket className="h-8 w-8 text-[#2563EB]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            実践<span className="text-[#2563EB]">プロジェクト集</span>
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          ステップバイステップで Java / Spring Boot の実践プロジェクトを構築
        </p>
      </motion.div>

      <div className="space-y-12">
        {projects.map((project, projectIndex) => {
          const diff = difficultyConfig[project.difficulty];
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: projectIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <Badge style={{ backgroundColor: diff.color, color: "white" }}>
                      {diff.label}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {project.timeEstimate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-4 w-4" /> {project.steps.length} ステップ
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.steps.map((step, stepIndex) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: stepIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                            style={{ backgroundColor: diff.color }}
                          >
                            {stepIndex + 1}
                          </div>
                          {stepIndex < project.steps.length - 1 && (
                            <div className="w-0.5 flex-1 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                          <p className="text-muted-foreground text-sm mb-3">
                            {step.description}
                          </p>
                          {step.code && <CodeBlock code={step.code} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
