




import Section from "../../../models/admin/sectionModel";
import connectDB from "../../../lib/db";
import Question from "../../../models/admin/QuestionModel";
import Category from "../../../models/admin/CategoryModel";
import SubCategory from "../../../models/admin/SubCategoryModel";


export async function POST(req) {
    try {
        await connectDB();

        const { subCategoryId, categoryId, name, questionIds } = await req.json();

        if (!subCategoryId || !categoryId || !name || !questionIds || questionIds.length === 0) {
            return new Response(JSON.stringify({ message: "Missing required fields or no questions provided" }), { status: 400 });
        }

        const subCategory = await SubCategory.findById(subCategoryId);
        const category = await Category.findById(categoryId);
        if (!subCategory || !category) {
            return new Response(JSON.stringify({ message: "SubCategory or Category not found" }), { status: 404 });
        }

        const questions = await Question.find({ _id: { $in: questionIds } });
        if (questions.length !== questionIds.length) {
            return new Response(JSON.stringify({ message: "Invalid question IDs" }), { status: 400 });
        }

        const maxQuestionsPerSection = 50;

        // Find the latest section for this subcategory and category
        const latestSection = await Section.findOne({ subCategory: subCategoryId, category: categoryId }).sort({ createdAt: -1 });

        let remainingQuestions = [...questions];
        const createdSections = [];

        if (latestSection && latestSection.questions.length < maxQuestionsPerSection) {
            const spaceLeft = maxQuestionsPerSection - latestSection.questions.length;
            const addingToExisting = remainingQuestions.slice(0, spaceLeft);

            latestSection.questions.push(...addingToExisting.map((q) => q._id));
            latestSection.questionLimit = latestSection.questions.length;
            await latestSection.save();
            createdSections.push(latestSection);

            remainingQuestions = remainingQuestions.slice(spaceLeft);
        }

        while (remainingQuestions.length > 0) {
            const sectionQuestions = remainingQuestions.splice(0, maxQuestionsPerSection);

            const newSection = new Section({
                subCategory: subCategoryId,
                category: categoryId,
                name: `${name} - Part ${createdSections.length + 1}`,
                questionLimit: sectionQuestions.length,
                questions: sectionQuestions.map((q) => q._id),
            });

            await newSection.save();
            createdSections.push(newSection);
        }

        return new Response(
            JSON.stringify({
                message: `${createdSections.length} section(s) updated/created successfully`,
                sections: createdSections,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating section:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500 }
        );
    }
}


// export async function POST(req) {
//     try {
//         await connectDB();

//         // Parse request JSON
//         const { subCategoryId, categoryId, name, questionIds } = await req.json();

//         // Validate inputs
//         if (!subCategoryId || !categoryId || !name || !questionIds || questionIds.length === 0) {
//             return new Response(JSON.stringify({ message: "Missing required fields or no questions provided" }), { status: 400 });
//         }

//         // Check if SubCategory and Category exist
//         const subCategory = await SubCategory.findById(subCategoryId);
//         const category = await Category.findById(categoryId);
//         if (!subCategory || !category) {
//             return new Response(JSON.stringify({ message: "SubCategory or Category not found" }), { status: 404 });
//         }

//         // Validate questions
//         const questions = await Question.find({ _id: { $in: questionIds } });
//         if (questions.length !== questionIds.length) {
//             return new Response(JSON.stringify({ message: "Invalid question IDs" }), { status: 400 });
//         }

//         // ✅ Calculate how many sections are needed
//         const maxQuestionsPerSection = 10;
//         const totalSections = Math.ceil(questions.length / maxQuestionsPerSection);

//         const createdSections = [];

//         for (let i = 0; i < totalSections; i++) {
//             const sectionQuestions = questions.slice(i * maxQuestionsPerSection, (i + 1) * maxQuestionsPerSection);

//             const newSection = new Section({
//                 subCategory: subCategoryId,
//                 category: categoryId,
//                 name: `${name} - Part ${i + 1}`,
//                 questionLimit: sectionQuestions.length,
//                 questions: sectionQuestions.map((q) => q._id),
//             });

//             await newSection.save();
//             createdSections.push(newSection);
//         }

//         return new Response(
//             JSON.stringify({
//                 message: `${createdSections.length} section(s) created successfully`,
//                 sections: createdSections,
//             }),
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error("Error creating section:", error);
//         return new Response(
//             JSON.stringify({ message: "Internal Server Error", error: error.message }),
//             { status: 500 }
//         );
//     }
// }
