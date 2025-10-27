"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t("projectInfo")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t("projectDescription")}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Code2 className="w-4 h-4" />
              <span>{t("builtWith")}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t("techStack")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Next.js 16 with App Router</li>
              <li>• TypeScript & Tailwind CSS</li>
              <li>• MongoDB Atlas (Cloud Database)</li>
              <li>• Recharts for Data Visualization</li>
              <li>• Framer Motion for Animations</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t("socialLinks")}
            </h3>
            <div className="space-y-3">
              <a
                href="https://github.com/coqueirojoao"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t("github")}</span>
              </a>
              <a
                href="https://linkedin.com/in/joao-pedro-coqueiro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>{t("linkedin")}</span>
              </a>
              <a
                href="mailto:azevedo.joao1995@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{t("email")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} João Pedro Coqueiro. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://github.com/coqueirojoao/dashboard-analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("viewSource")}
              </a>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span className="text-gray-600 dark:text-gray-400">{t("madeBy")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
