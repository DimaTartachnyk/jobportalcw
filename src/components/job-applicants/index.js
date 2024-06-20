'use client';


import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {ScrollArea} from "@/components/ui/scroll-area";
import CandidateList from "@/components/candidate-list";

function JobApplicants({
                           showApplicantsDrawer,
                           setShowApplicantsDrawer,
                           showCurrentCandidateDetailsModal,
                           setShowCurrentCandidateDetailsModal,
                           currentCandidateDetails,
                           setCurrentCandidateDetails,
                           jobItem,
                           jobApplications,
                       }) {
    return (
        <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
            <DrawerContent className="max-h-[50vh]">
                <ScrollArea className="h-auto overflow-y-auto">
                    <CandidateList
                        currentCandidateDetails={currentCandidateDetails}
                        setCurrentCandidateDetails={setCurrentCandidateDetails}
                        jobApplications={jobApplications}
                        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

export default JobApplicants;