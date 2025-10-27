"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, Code2, Database, BarChart3, Zap, Github, ExternalLink } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      titleKey: "keyFeatures.dataVisualization.title",
      descriptionKey: "keyFeatures.dataVisualization.description",
    },
    {
      icon: <Database className="w-6 h-6" />,
      titleKey: "keyFeatures.mongodbIntegration.title",
      descriptionKey: "keyFeatures.mongodbIntegration.description",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      titleKey: "keyFeatures.modernStack.title",
      descriptionKey: "keyFeatures.modernStack.description",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      titleKey: "keyFeatures.devPractices.title",
      descriptionKey: "keyFeatures.devPractices.description",
    },
  ];

  const techStack = [
    {
      categoryKey: "techStack.frontend",
      items: ["Next.js 16", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"],
    },
    {
      categoryKey: "techStack.backend",
      items: ["Next.js API Routes", "MongoDB Atlas", "Mongoose"],
    },
    {
      categoryKey: "techStack.devTools",
      items: ["ESLint", "Prettier", "Husky", "Commitlint", "tsx"],
    },
    { categoryKey: "techStack.deployment", items: ["Vercel", "GitHub"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("backToDashboard")}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t("projectOverview.title")}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>{t("projectOverview.paragraph1")}</p>
            <p>{t("projectOverview.paragraph2")}</p>
            <p>{t("projectOverview.paragraph3")}</p>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t("keyFeatures.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{t(feature.descriptionKey)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t("techStack.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t(stack.categoryKey)}
                </h3>
                <ul className="space-y-2">
                  {stack.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 dark:text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://github.com/coqueirojoao/dashboard-analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <Github className="w-5 h-5" />
            {t("links.viewSource")}
          </a>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            {t("links.viewLive")}
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center text-gray-600 dark:text-gray-400"
        >
          <p>
            {t("builtBy")}{" "}
            <a
              href="https://github.com/coqueirojoao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              João Pedro Cogueiro de Azevedo
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
