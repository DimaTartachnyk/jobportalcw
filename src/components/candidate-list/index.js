'use client'


import {Fragment} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent} from "@/components/ui/dialog";

function CandidateList({
                           jobApplications,
                           currentCandidateDetails,
                           setCurrentCandidateDetails,
                           showCurrentCandidateDetailsModal,
                           setShowCurrentCandidateDetailsModal
                       }) {
    return (


        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                    jobApplications && jobApplications.length > 0 ?
                        jobApplications.map((jobApplicantItem) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                                <div className="px-4 my-6 flex justify-between items-center">
                                    <h3 className="text-lg font-bold dark:text-black">
                                        {jobApplicantItem?.name}
                                    </h3>
                                    <Button
                                        onClick={() => setShowCurrentCandidateDetailsModal(true)}
                                        className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        )) : null}
            </div>
            <Dialog
            open={showCurrentCandidateDetailsModal}
            onOpenChange={setShowCurrentCandidateDetailsModal}
            >
                <DialogContent>
                    Candidate
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default CandidateList;