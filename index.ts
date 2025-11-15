
#!/usr/bin/env node

import { createCommand } from 'commander';
import { spawn } from 'child_process';
import * as path from 'path';

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
program
.command('run')
.description('Run a new Arabic LLM evaluation task.')
.option('-c, --config <path>', 'Path to the Mizan configuration file (YAML/JSON).', 'mizan_config.yaml')
.action((options) => {
    // 1. تحديد مسار نواة Python
    const pythonCorePath = path.join(process.cwd(), 'mizan_core', 'core.py');
    const configPath = options.config;

    console.log(`
    Mizan Evaluation Initiated...
    - Config Path: ${configPath}
    - Python Core: ${pythonCorePath}
    `);

    // 2. استخدام spawn لتشغيل نواة Python
    // (يجب أن يكون لديك بيئة Python مُهيأة ومثبت عليها المتطلبات)
    
    // الأوامر التي سيتم تنفيذها: python mizan_core/core.py <مسار-ملف-الإعدادات>
    const pythonProcess = spawn('python', [pythonCorePath, configPath]);

    // معالجة مخرجات Python Core (طباعتها مباشرة في CLI)
    pythonProcess.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    // معالجة الأخطاء
    pythonProcess.stderr.on('data', (data) => {
      console.error(`PYTHON ERROR: ${data}`);
    });

    // عند انتهاء عملية Python
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ Mizan Evaluation Task completed successfully (Exit Code ${code}).`);
      } else {
        console.error(`\n❌ Mizan Evaluation Task failed (Exit Code ${code}).`);
      }
    });
  });

program.parse(process.argv);
