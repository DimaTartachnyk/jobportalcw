"use server"
import connectToDB from "@/database";
import Profile from "@/models/profile";
import {revalidatePath} from "next/cache";
import Job from "@/models/job";
import Application from "@/models/application";

//create profile action


export async function createProfileAction(formData, pathToRevalidate) {
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
}


export async function fetchProfileAction(id) {
    await connectToDB();
    const result = await Profile.findOne({userId: id});

    return JSON.parse(JSON.stringify(result));
}


// create job action
export async function postNewJobAction(formData, pathToRevalidate) {
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

// fetch job action
//recruiter
export async function fetchJobsForRecruiterAction(id) {
    await connectToDB();
    const result = await Job.find({recruiterId: id});

    return JSON.parse(JSON.stringify(result));
}

//candidate
export async function fetchJobsForCandidateAction(filterParams = {}) {
    await connectToDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterKey) => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });
    console.log(updatedParams, "updatedParams");
    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});

    return JSON.parse(JSON.stringify(result));
}

//create job application
export async function createJobApplicationAction(data, pathToRevalidate) {
    await connectToDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate);
}

//fetch  job applications - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
    await connectToDB();
    const result = await Application.find({candidateUserID: candidateID});

    return JSON.parse(JSON.stringify(result));
}

//fetch  job applications - recruiter
export async function fetchJobApplicationsForRecruiter(recruiterID) {
    await connectToDB();
    const result = await Application.find({recruiterUserID: recruiterID});

    return JSON.parse(JSON.stringify(result));
}


// update job applications
export async function updateJobApplicationAction(data, pathToRevalidate) {
    await connectToDB();
    const {recruiterUserID, name, email, candidateUserID, status, jobID, _id, jobAppliedDate,} = data;
    await Application.findOneAndUpdate({_id: _id,},
        {recruiterUserID, name, email, candidateUserID, status, jobID, jobAppliedDate,},
        {new: true}
    );
    revalidatePath(pathToRevalidate);
}


//get candidate details by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
    await connectToDB();
    const result = await Profile.findOne({userId: currentCandidateID});

    return JSON.parse(JSON.stringify(result));
}

//create filter categories
export async function createFilterCategoryAction() {
    await connectToDB();
    const result = await Job.find({});

    return JSON.parse(JSON.stringify(result));
}
