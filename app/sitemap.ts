import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://study-with-arup.vercel.app";

  const staticRoutes = [
    "",
    "/exams",
    "/exams/wbp-constable",
    "/exams/wbp-constable/syllabus",
    "/exams/wbp-constable/news",
    "/exams/wbp-constable/pyq",
    "/exams/wbp-constable/prepare",
    "/exams/ssc-gd",
    "/exams/ssc-gd/syllabus",
    "/exams/ssc-gd/news",
    "/exams/ssc-gd/pyq",
    "/exams/ssc-gd/prepare",
    "/exams/agniveer-army",
    "/exams/agniveer-army/syllabus",
    "/exams/agniveer-army/news",
    "/exams/agniveer-army/pyq",
    "/exams/agniveer-army/prepare",
    "/exams/wb-panchayat",
    "/exams/wb-panchayat/syllabus",
    "/exams/wb-panchayat/news",
    "/exams/wb-panchayat/pyq",
    "/exams/wb-panchayat/prepare",
    "/ai-tutor",
    "/current-affairs",
    "/contact",
    "/about",
    "/quiz",
    "/mock-tests",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route.includes("news") ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.includes("syllabus") ? 0.9 : 0.8,
  }));
}
