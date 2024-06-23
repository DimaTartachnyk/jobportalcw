import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";


function CommonForm({
                        action,
                        buttonText,
                        isBtnDisabled,
                        formControls,
                        btnType,
                        formData,
                        setFormData,
                        handleFileChange
                    }) {
    function renderInputByComponentType(getCurrentControl) {
        let content = null;
        switch (getCurrentControl.componentType) {
            case 'input':
                content = (<div className="relative flex items-center mt-8">
                    <Input
                        type="text"
                        disabled={getCurrentControl.disabled}
                        placeholder={getCurrentControl.placeholder}
                        name={getCurrentControl.name}
                        id={getCurrentControl.name}
                        value={formData[getCurrentControl.name]}
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                        className="w-full rounded-md h-[60px] px-4 border dark:text-black dark:bg-zinc-400 dark:placeholder-zinc-700 bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out dark:focus:bg-white dark:hover:bg-white focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>);
                break;
            case 'file':
                content = (<Label
                    for={getCurrentControl.name}
                    className="flex dark:text-black dark:bg-zinc-400 dark:placeholder-zinc-700 bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer">
                    <h2>{getCurrentControl.label}</h2>
                    <Input onChange={handleFileChange}
                           id={getCurrentControl.name}
                           type="file"/>
                </Label>);
                break;

            default:
                content = (<div className="relative flex items-center mt-8">
                    <Input
                        type="text"
                        disabled={getCurrentControl.disabled}
                        placeholder={getCurrentControl.placeholder}
                        name={getCurrentControl.name}
                        id={getCurrentControl.name}
                        value={formData[getCurrentControl.name]}
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                        className="w-full rounded-md h-[60px] px-4 border dark:text-black dark:bg-zinc-400 dark:placeholder-zinc-700 bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out dark:focus:bg-white dark:hover:bg-white focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>);
                break;
        }
        return content;
    }

    return (
        <form action={action}>
            {
                formControls.map(control => renderInputByComponentType(control))
            }
            <div className="mt-6 w-full">
                <Button
                    type={btnType || 'Submit'}
                    className="disabled:opacity-60 dark:bg-zinc-400 dark:hover:bg-white flex h-11 items-center justify-center px-5"
                    disabled={isBtnDisabled}>{buttonText}</Button>
            </div>
        </form>
    )
}

export default CommonForm;