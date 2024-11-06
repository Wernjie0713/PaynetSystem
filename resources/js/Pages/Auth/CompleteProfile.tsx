import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export default function CompleteProfile() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        matric_no: '',
        duitnow_id: '',
        faculty: '',
        campus: '',
        phone_no: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.complete'), {
            onFinish: () => reset('name', 'duitnow_id', 'matric_no', 'faculty', 'campus', 'phone_no'),
        });
    };

    const handleFacultyChange = (value: string) => {
        setData('faculty', value);
    };

    const handleCampusChange = (value: string) => {
        setData('campus', value);
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="matric_no" value="Matric No." />

                    <TextInput
                        id="matric_no"
                        type="text"
                        name="matric_no"
                        value={data.matric_no}
                        className="mt-1 block w-full"
                        autoComplete="matric_no"
                        isFocused={true}
                        onChange={(e) => setData('matric_no', e.target.value)}
                        required
                    />

                    <InputError message={errors.matric_no} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_no" value="Phone No." />

                    <TextInput
                        id="phone_no"
                        type="tel"
                        name="phone_no"
                        value={data.phone_no}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        isFocused={true}
                        onChange={(e) => setData('phone_no', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone_no} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="duitnow_id" value="DuitNow ID" />

                    <TextInput
                        id="duitnow_id"
                        type="text"
                        name="duitnow_id"
                        value={data.duitnow_id}
                        className="mt-1 block w-full"
                        autoComplete="duitnow_id"
                        onChange={(e) => setData('duitnow_id', e.target.value)}
                        required
                    />

                    <InputError message={errors.duitnow_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="campus" value="Campus" />
                    <Select onValueChange={handleCampusChange} value={data.campus}>
                        <SelectTrigger className="w-[400px]">
                            <SelectValue placeholder="Select your Campus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UTM JOHOR BAHRU">UTM JOHOR BAHRU</SelectItem>
                            <SelectItem value="UTM KUALA LUMPUR">UTM KUALA LUMPUR</SelectItem>
                            <SelectItem value="UTM PAGOH">UTM PAGOH</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.campus} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="faculty" value="Faculty" />
                    <Select onValueChange={handleFacultyChange} value={data.faculty}>
                        <SelectTrigger className="w-[400px]">
                            <SelectValue placeholder="Select your Faculty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Faculty of Computing (FC)">Faculty of Computing (FC)</SelectItem>
                            <SelectItem value="Faculty of Build Environment (FABU)">Faculty of Build Environment and Surveying (FABU)</SelectItem>
                            <SelectItem value="Faculty of Chemical and Energy Engineering (FKT)">Faculty of Chemical and Energy Engineering (FKT)</SelectItem>
                            <SelectItem value="Faculty of Civil Engineering (FKA)">Faculty of Civil Engineering (FKA)</SelectItem>
                            <SelectItem value="Faculty of Mechanical Engineering (FKM)">Faculty of Mechanical Engineering (FKM)</SelectItem>
                            <SelectItem value="Faculty of Electrical Engineering (FKE)">Faculty of Electrical Engineering (FKE)</SelectItem>
                            <SelectItem value="Faculty of Science (FS)">Faculty of Science (FS)</SelectItem>
                            <SelectItem value="Faculty of Social Sciences and Humanities (FSSH)">Faculty of Social Sciences and Humanities (FSSH)</SelectItem>
                            <SelectItem value="Faculty of Management (FM)">Faculty of Management (FM)</SelectItem>
                            <SelectItem value="Faculty of Artificial Intelligence (FAI)">Faculty of Artificial Intelligence (FAI)</SelectItem>
                            <SelectItem value="Malaysia-Japan International Institute of Technology (MIJIT)">Malaysia-Japan International Institute of Technology (MIJIT)</SelectItem>
                            <SelectItem value="Azman Hashim International Business School (AHIBS)">Azman Hashim International Business School (AHIBS)</SelectItem>
                            <SelectItem value="UTMSPACE (School of Professional and Continuing Education)">UTMSPACE (School of Professional and Continuing Education)</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.faculty} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Complete Profile
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
