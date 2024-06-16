'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect, useState} from "react";
import CommonForm from "@/components/common-form";
import {candidateOnboardFormControls, initialRecruiterFormData, initialCandidateFormData, recruiterOnboardFormControls} from "@/utils";
import {useUser} from "@clerk/nextjs";
import {createProfileAction} from "@/actions";
import {createClient} from "@supabase/supabase-js";

const supabaseClient = createClient(
    'https://aswgnxiceeviaodfaufj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzd2dueGljZWV2aWFvZGZhdWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NjU2MTEsImV4cCI6MjAzNDE0MTYxMX0.90deQ-26SO13kTM2ODDan7iJfCH21K865w92EvTLgW0');

function OnBoard() {

    const [currentTab, setCurrentTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
    const [file, setFile] = useState(null);


    const currentAuthUser = useUser();
    const {user} = currentAuthUser;

    function handleFileChange(event){
        event.preventDefault();
        setFile(event.target.files[0])
    }

    async function handleUploadPdfToSupabase(){
        const {data, error} = await supabaseClient.storage
    }

    useEffect(() => {
        if (file) handleUploadPdfToSupabase()
    }, [file]);

    function handleTabChange(value){
        setCurrentTab(value);
    }



    function handleRecruiterFormValid(){
        return recruiterFormData &&
            recruiterFormData.name.trim() !== '' &&
            recruiterFormData.companyName.trim() !== '' &&
            recruiterFormData.companyRole.trim() !== ''
    }
    async function createProfile(){
        const data = {
            recruiterInfo : recruiterFormData,
            role : 'recruiter',
            isPremiumUser: false,
            userId : user?.id,
            email : user?.primaryEmailAddress?.emailAddress
        }

        await createProfileAction(data, '/onboard')
    }

    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome to onboarding
                        </h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                    formControls={candidateOnboardFormControls}
                    buttonText={'Onboard as candidate'}
                    formData={candidateFormData}
                    setFormData={setCandidateFormData}
                    handleFileChange={handleFileChange}
                    />
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm
                    formControls={recruiterOnboardFormControls}
                    buttonText={'Onboard as recruiter'}
                    formData={recruiterFormData}
                    setFormData={setRecruiterFormData}
                    isBtnDisabled={!handleRecruiterFormValid()}
                    action={createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default OnBoard;