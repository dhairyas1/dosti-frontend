const Course = require("../models/Course");
const IsLessonDone = require("../models/IsLessonDone");
const Lesson = require("../models/Lesson");
const Order = require("../models/Order");
const Section = require("../models/Section");
const mongoose = require("mongoose");
const { courseNames, devopsCourses, blockchainCourses } = require("./fakerData");
const slugify = require("slugify");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { UNSPLASH_API_KEY } = require("../config/constant");
const { BACKEND_URL } = require("../config/backend-domain");
const Review = require("../models/Review");

exports.updateStockQty = updateStockQty = (courseList) => {
  courseList.forEach(async (course) => {
    const { prodId, qty } = course;
    console.log("update stock qty at database!!!");
    const courseItem = await course.findById(prodId);
    courseItem.stockQty = courseItem.stockQty - qty;
    courseItem.save();
  });
};

exports.getCoursesOrderByUserId = async (userId) => {
  const courses = await Order.find({
    "user._id": userId,
  })
    .select("items")
    .populate("items._id");

  const results = courses
    .map((courseItem) => {
      return courseItem.items;
    })
    .flat()
    .map((item) => item._id);

  return results;
};

exports.getProgressOfCourse = async (courseId, userId) => {
  const sectionsOfCourse = await Section.find({
    courseId,
  });
  let numOfLessonDone = 0;
  let totalVideosLengthDone = 0;
  let lessonsOfCourse = [];

  for (const section of sectionsOfCourse) {
    const lessons = await Lesson.find({
      sectionId: section._id,
    });
    lessonsOfCourse.push(lessons);
  }

  lessonsOfCourse = lessonsOfCourse.flat();

  for (const lesson of lessonsOfCourse) {
    const isDone = await IsLessonDone.findOne({
      userId,
      lessonId: lesson._id,
    });

    if (isDone) {
      numOfLessonDone += 1;
      totalVideosLengthDone += lesson.videoLength;
    }
  }

  const numOfLessons = lessonsOfCourse.length;

  let progress = 0;

  if (numOfLessons === 0) {
    progress = 0;
  } else {
    progress = numOfLessonDone / numOfLessons;
  }

  return {
    progress,
    totalVideosLengthDone,
  };
};

// Function to generate random courses
exports.generateRandomCourses = async (numCourses) => {
  const categoriesIdList = [
    "646781266859a50acfca8e93",
    "64b363573bbbb6317297378d",
    "64b363b13bbbb6317297378f",
    "64b364203bbbb63172973793",
    "64bb4e1582a5abc6b1c13305",
  ];
  const backendId = "646781266859a50acfca8e93";
  const frontendId = "64b363573bbbb6317297378d";
  const iotId = "64b364203bbbb63172973793";
  const blockchainId = "64bb4e1582a5abc6b1c13305";
  const devopsId = "64bb411b19f0935f065b9898";

  const courses = [];
  for (let i = 0; i < numCourses; i++) {
    const courseName = blockchainCourses[i];

    // Use Unsplash instead of OpenAI for thumbnails
    const thumbnail = await generateThumbnailFromUnsplash(courseName);
    
    const price = 0;
    const description = generateCourseDescriptionByCourseName(courseName);
    const course = {
      name: courseName,
      subTitle: "Subtitle not available.",
      thumbnail,
      access: "FREE", // You can adjust this based on your requirements
      views: 0,
      price: price,
      finalPrice: price - 20,
      description: description,
      level: "All Level",
      courseSlug: slugify(courseName, { lower: true, strict: true }),
      userId: "6468a145401d3810494f4797",
      categoryId: blockchainId,
      requirements: [],
      willLearns: [],
      tags: [],
    };
    courses.push(course);
  }
  return courses;
};

// Keep generateThumbnailFromUnsplash as is - it's a good alternative to OpenAI
const generateThumbnailFromUnsplash = async (courseName) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: courseName,
        orientation: "landscape",
        client_id: UNSPLASH_API_KEY,
        per_page: 10,
      },
    });

    return response.data.results[0].urls.regular;
  } catch (error) {
    console.log("Error generating thumbnail:", error);
    return faker.image.urlLoremFlickr({ category: courseName });
  }
};

// Simplified course description generator
const generateCourseDescriptionByCourseName = (courseName) => {
  return `Comprehensive course about ${courseName}. Learn essential concepts and practical applications.`;
};

// Simplified section name generator
const generateSectionsName = async () => {
  return ["Introduction", "Fundamentals", "Advanced Topics", "Projects", "Conclusion"];
};

const createOutline = async (courseId) => {
  try {
    // const courseId = "64c5d873c573c1ec5d4a1907"; // Replace with the actual course ID

    const courseSections = await generateSectionsName(courseId);

    console.log("course sections: ", courseSections.length);
    console.log("course sections: ", courseSections);

    // Generate and save the sections for the course
    const sections = courseSections.map((sectionName, index) => ({
      courseId,
      name: `Section ${String(index + 1).padStart(2, "0")}: ${sectionName}`,
      access: "PAID", // Adjust the access type as needed
      description: "", // Add a description for each section if required
    }));

    const createdSections = await Section.insertMany(sections);
    console.log("Sections created:", createdSections);
    return createdSections;
  } catch (error) {
    console.log("Error generating outline:", error);
    return [];
  }
};

const generateLessonBySectionName = async (outlineOfCourse) => {};

exports.getCourseDetailInfo = async (courseId) => {
  try {
    const course = await Course.findById(courseId)
      .populate("categoryId", "_id name")
      .populate("userId", "_id name avatar");

    const sections = await Section.find({
      courseId,
    });

    const lessonsOfCoursePromise = sections.map(async (sectionItem) => {
      const lessons = await Lesson.find({
        sectionId: sectionItem._id,
      });

      return lessons;
    });

    const lessonsOfCourse = (await Promise.all(lessonsOfCoursePromise)).flat();

    const orders = await Order.find({
      "items._id": courseId,
    });

    const numOfStudents = orders.length;

    const totalVideosLength = lessonsOfCourse.reduce((acc, lesson) => acc + lesson.videoLength, 0);
    // console.log(sections);

    const reviews = await Review.find({ courseId });

    const avgRatingStars =
      reviews.reduce((acc, review) => acc + review.ratingStar, 0) / reviews.length;

    const result = {
      _id: course._id,
      name: course.name,
      price: course.price,
      finalPrice: course.finalPrice,
      thumbnail: course.thumbnail,
      access: course.access,
      views: course.views,
      description: course.description,
      categoryId: {
        _id: course.categoryId._id,
        name: course.categoryId.name,
      },
      userId: {
        _id: course.userId._id,
        name: course.userId.name,
        avatar: course.userId.avatar,
      },
      courseSlug: course.courseSlug,
      level: course.level,
      sections: sections.length,
      lessons: lessonsOfCourse.length,
      students: numOfStudents,
      totalVideosLength,
      numOfReviews: reviews.length,
      avgRatingStars: avgRatingStars || 0,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };

    return result;
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to fetch Courses!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};

// exports.getLessonsByCourseId = async (courseId) => {
//   try {
//     // Check if the courseId exists in the Course collection
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ error: "Course not found" });
//     }

//     // Query all lessons with the given courseId
//     const lessons = await Lesson.find({ sectionId: { $in: course.sections } });

//     console.log("lessons: ", lessons);

//     return lessons;
//   } catch (error) {
//     return [];
//   }
// };

exports.getCoursesOrderedByUserInfo = async (userId) => {
  try {
    const courses = await Order.find({
      "user._id": userId,
    })
      .select("items")
      .populate("items._id");

    // .populate("categoryId", "_id name")
    // .populate("userId", "_id name");

    const results = courses
      .map((courseItem) => {
        return courseItem.items;
      })
      .flat()
      .map((item) => item._id);

    return results;
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to fetch Courses!");
      error.statusCode(422);
      return error;
    }

    return [];
  }
};

exports.generateSectionsName = generateSectionsName;
exports.createOutline = createOutline;