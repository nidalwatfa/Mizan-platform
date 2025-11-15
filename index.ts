#!/usr/bin/env node

import { createCommand } from 'commander';

// تحديد اسم ووصف ونسخة أداة سطر الأوامر (CLI)
const program = createCommand();

program
 .name('mizan')
 .description('Mizan Platform CLI: Evaluation framework for Arabic LLMs and AI Agents.')
 .version('0.1.0-alpha');

// الأمر الأساسي 'mizan' بدون أي وسائط
program.action(() => {
  console.log(`
  منصة ميزان (Mizan Platform)
  ---------------------------------
  إطار عمل مفتوح المصدر لتقييم نماذج اللغة العربية الكبيرة.
  Mizan CLI: Ready for systematic Arabic LLM evaluation.

  استخدم mizan --help لعرض الأوامر المتاحة.
  `);
});

// تعريف أمر فرعي (Subcommand) لعملية التقييم
// هذا هو الأمر الذي سنطوره لتقييم الحوار متعدد الأدوار في الخطوات القادمة
program
 .command('run')
 .description('Run a new Arabic LLM evaluation task.')
 .option('-c, --config <path>', 'Path to the Mizan configuration file (YAML/JSON).')
 .action((options) => {
    console.log(`
   
    Evaluation task initiated.
    - Configuration path: ${options.config |

| 'Default configuration'}
    
    جاري تهيئة محرك تقييم الحوار متعدد الأدوار... (Multi-Turn Dialogue Engine initializing...)
    `);
    // هنا سيتم استدعاء نواة بايثون (Python Core) لعملية التقييم الفعلية
  });

program.parse(process.argv);
