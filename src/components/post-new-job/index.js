'use client';

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";
import CommonForm from "@/components/common-form";
import {initialPostNewJobFormData, postNewJobFormControls} from "@/utils";
import {postNewJobAction} from "@/actions";
import { useToast } from "@/components/ui/use-toast"

function PostNewJob({profileInfo, user, jobList}) {
    const [showJobDialog, setShowJobDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName,
    });

    console.log(jobFormData)

    const {toast} = useToast()

    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every(
            (control) => jobFormData[control] && jobFormData[control].trim() !== ""
        );
    }

    function handleAddNewJob(){
        if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
            toast({
                variant: "destructive",
                title: "You can post max 2 jobs.",
                description: "Please opt for membership to post more jobs",
            });
            return;
        }
        setShowJobDialog(true);
    }

    async function createNewJob(){
        await postNewJobAction({
            ...jobFormData,
            recruiterId : user?.id,
            applicants : []
        }, "/jobs");
        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
        })
        setShowJobDialog(false);
    }

    return <div>
        <Button onClick={handleAddNewJob}
                className="disabled:opacity-60 flex h-11 items-center justify-center px-5">
            Post A Job
        </Button>
        <Dialog open={showJobDialog} onOpenChange={() => {
            setShowJobDialog(false);
            setJobFormData({
                ...initialPostNewJobFormData,
                companyName: profileInfo?.recruiterInfo?.companyName,
            });
        }}>
            <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <div className="grid gap-4 py-4">
                        <CommonForm
                            buttonText={'Add'}
                            formData={jobFormData}
                            setFormData={setJobFormData}
                            formControls={postNewJobFormControls}
                            isBtnDisabled={!handlePostNewBtnValid()}
                            action={createNewJob}
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
}

export default PostNewJob;