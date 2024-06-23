'use client';

import JobIcon from "@/components/job-icon";
import CommonCard from "@/components/common-card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import JobApplicants from "@/components/job-applicants";

function  RecruiterJobCard ({jobItem , jobApplications}){

    const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
    const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
    const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] = useState(false);
    return <div>
        <CommonCard
        icon={<JobIcon/>}
        title={jobItem?.title}
        footerContent={
            <Button
                onClick={()=> setShowApplicantsDrawer(true)}
                className="disabled:opacity-55 dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:text-white flex h-11 items-center justify-center px-5"
                disabled={jobApplications.filter(item=>item.jobID === jobItem?._id).length === 0}
            >
                {
                    jobApplications.filter(item=>item.jobID === jobItem?._id).length
                }{" "}
                Applicants
            </Button>
        }/>
        <JobApplicants
            showApplicantsDrawer={showApplicantsDrawer}
            setShowApplicantsDrawer={setShowApplicantsDrawer}
            showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
            setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            jobItem={jobItem}
            jobApplications={jobApplications.filter((jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id)}
        />
    </div>
}

export default RecruiterJobCard;