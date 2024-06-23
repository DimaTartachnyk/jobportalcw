'use client'


import {Fragment} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog";
import {getCandidateDetailsByIDAction, updateJobApplicationAction} from "@/actions";
import {createClient} from "@supabase/supabase-js";

const supabaseClient = createClient(
    'https://aswgnxiceeviaodfaufj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzd2dueGljZWV2aWFvZGZhdWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NjU2MTEsImV4cCI6MjAzNDE0MTYxMX0.90deQ-26SO13kTM2ODDan7iJfCH21K865w92EvTLgW0'
)

function CandidateList({
                           jobApplications,
                           currentCandidateDetails,
                           setCurrentCandidateDetails,
                           showCurrentCandidateDetailsModal,
                           setShowCurrentCandidateDetailsModal
                       }) {
    async function handleFetchCandidateDetails(getCurrentCandidateId) {
        const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);
        if (data) {
            setCurrentCandidateDetails(data);
            setShowCurrentCandidateDetailsModal(true);
        }
    }

    function handlePreviewResume() {
        const {data} = supabaseClient.storage
            .from("job-board-public")
            .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

        const a = document.createElement("a");
        a.href = data?.publicUrl;
        a.setAttribute("download", "Resume.pdf");
        a.setAttribute("target", "_blank");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async function handleUpdateJobStatus(getCurrentStatus) {
        let cpyJobApplicants = [...jobApplications];
        const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
            (item) => item.candidateUserID === currentCandidateDetails?.userId
        );
        const jobApplicantsToUpdate = {
            ...cpyJobApplicants[indexOfCurrentJobApplicant],
            status: cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus),
        };
        await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
    }

    return (


        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                    jobApplications && jobApplications.length > 0 ?
                        jobApplications.map((jobApplicantItem) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="bg-white dark:bg-zinc-300 shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                                <div className="px-4 my-6 flex justify-between items-center">
                                    <h3 className="text-lg font-bold dark:text-black">
                                        {jobApplicantItem?.name}
                                    </h3>
                                    <Button
                                        onClick={() => handleFetchCandidateDetails(jobApplicantItem?.candidateUserID)}
                                        className="dark:bg-zinc-900 dark:text-white  flex h-11 items-center justify-center px-5"
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        )) : null}
            </div>
            <Dialog
                open={showCurrentCandidateDetailsModal}
                onOpenChange={() => {
                    setCurrentCandidateDetails(null);
                    setShowCurrentCandidateDetailsModal(false);
                }}
            >
                <DialogContent>
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white text-black">
                            {currentCandidateDetails?.candidateInfo?.name},{" "}
                            {currentCandidateDetails?.email}
                        </h1>
                        <p className="text-xl font-medium dark:text-white text-black">
                            {currentCandidateDetails?.candidateInfo?.currentCompany}
                        </p>
                        <p className="text-sm font-normal dark:text-white text-black">
                            {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                        </p>
                        <p className="dark:text-white">
                            Total Experience:
                            {currentCandidateDetails?.candidateInfo?.totalExperience} Years
                        </p>
                        <p className="dark:text-white">
                            Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}$
                        </p>
                        <p className="dark:text-white">
                            Notice Period:{" "}
                            {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                         <div className="flex flex-wrap items-center gap-4 mt-6">
                                Previous Companies:
                                {currentCandidateDetails?.candidateInfo?.previousCompanies.split(",").map((skillItem) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div
                                        className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                        <h2 className="text-[13px] dark:text-black font-medium text-white">
                                            {skillItem}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6 items-center">
                            Skills:
                            {currentCandidateDetails?.candidateInfo?.skills.split(",").map((skillItem) => (
                                // eslint-disable-next-line react/jsx-key
                                <div
                                    className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] dark:text-black font-medium text-white">
                                        {skillItem}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={handlePreviewResume} className=" flex h-11 dark:bg-zinc-300 dark:hover:bg-white items-center justify-center px-5">
                            Resume
                        </Button>

                        <Button onClick={() => handleUpdateJobStatus("selected")}
                                className=" disabled:opacity-65 flex h-11 dark:bg-zinc-300 dark:hover:bg-white items-center justify-center px-5"
                            disabled={
                                jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes("selected") ||
                                jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes("rejected")
                            }>
                            {jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes("selected") ? "Selected" : "Select"}
                        </Button>

                        <Button
                            onClick={() => handleUpdateJobStatus("rejected")}
                            className=" disabled:opacity-65 flex h-11 dark:bg-zinc-300 dark:hover:bg-white items-center justify-center px-5"
                            disabled={
                                jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes("selected") ||
                                jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes("rejected")
                            }>
                            {jobApplications.find((item) => item.candidateUserID === currentCandidateDetails?.userId)?.status.includes("rejected") ? "Rejected" : "Reject"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default CandidateList;