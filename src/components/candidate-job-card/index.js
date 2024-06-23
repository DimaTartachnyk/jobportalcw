'use client';

import {Fragment, useState} from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import CommonCard from "@/components/common-card";
import JobIcon from "@/components/job-icon";
import {Button} from "@/components/ui/button";
import {createJobApplicationAction} from "@/actions";
import {useToast} from "@/components/ui/use-toast";

function CandidateJobCard({jobItem, profileInfo, jobApplications}) {
    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
    console.log(jobApplications, 'jobApplications')

    const {toast} = useToast();

    async function handleJobApply() {
        if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
            setShowJobDetailsDrawer(false);
            toast({
                variant: "destructive",
                title: "You can apply max 2 jobs.",
                description: "Please opt for membership to apply for more jobs",
            });
            return;
        }

        await createJobApplicationAction({
            recruiterUserID: jobItem.recruiterId,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserID: profileInfo?.userId,
            status: ['Applied'],
            jobID: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString(),
        }, '/jobs')
        setShowJobDetailsDrawer(false)
    }

    return (
        <Fragment>
            <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
                <CommonCard
                    icon={<JobIcon/>}
                    title={jobItem?.title}
                    description={jobItem?.companyName}
                    footerContent={
                        <Button
                            onClick={() => setShowJobDetailsDrawer(true)}
                            className=" dark:bg-zinc-900 dark:text-white flex h-11 items-center justify-center px-5">
                            View Details</Button>

                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle
                                className="text-4xl font-extrabold dark:text-zinc-200 text-gray-800">{jobItem?.title}</DrawerTitle>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleJobApply}
                                    disabled={
                                        jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1 /*? true : false*/
                                    }
                                    className="disabled:opacity-65 dark:bg-zinc-300 dark:hover:bg-white flex h-11 items-center justify-center px-5">
                                    {jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1 ? "Applied" : "Apply"}
                                </Button>
                                <Button
                                    className=" flex h-11 dark:bg-zinc-300 dark:hover:bg-white items-center justify-center px-5"
                                    onClick={() => setShowJobDetailsDrawer(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium dark:text-zinc-400 text-gray-600">
                        {jobItem?.description}
                        <span className="text-xl font-normal ml-4 dark:text-zinc-400 text-gray-500">{jobItem?.location}</span>
                    </DrawerDescription>
                    <div className="w-[200px] mt-6 flex justify-center items-center h-[40px] dark:bg-zinc-300 bg-black rounded-[4px]">
                        <h2 className="text-xl font-bold dark:text-black text-white">{jobItem?.type} Time</h2>
                    </div>
                    <h3 className="text-2xl dark:text-white font-medium text-black mt-3">Experience: {jobItem.experience} year</h3>
                    <div className="flex gap-4 mt-6">
                        {jobItem?.skills.split(',').map((skillItem) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="w-[100px] flex justify-center items-center h-[35px] dark:bg-zinc-300 bg-black rounded-[4px]">
                                <h2 className="text-[13px] font-medium dark:text-black text-white">{skillItem}</h2>
                            </div>
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}

export default CandidateJobCard;