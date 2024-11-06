import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        matric_no: user.matric_no,
        duitnow_id: user.duitnow_id,
        faculty: user.faculty,
        campus: user.campus,
        phone_no: user.phone_no,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const handleFacultyChange = (value: string) => {
        setData('faculty', value);
    };

    const handleCampusChange = (value: string) => {
        setData('campus', value);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="matric_no" value="Matric No." />

                    <TextInput
                        id="matric_no"
                        type="text"
                        value={data.matric_no}
                        className="mt-1 block w-full"
                        autoComplete="matric_no"
                        isFocused={true}
                        onChange={(e) => setData('matric_no', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.matric_no} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                        value={data.email}
                        required
                        autoComplete="username"
                        disabled={true}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_no" value="Phone No." />

                    <TextInput
                        id="phone_no"
                        type="tel"
                        value={data.phone_no}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        isFocused={true}
                        onChange={(e) => setData('phone_no', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.phone_no} />
                </div>

                <div>
                    <InputLabel htmlFor="duitnow_id" value="DuitNow ID" />

                    <TextInput
                        id="duitnow_id"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.duitnow_id}
                        onChange={(e) => setData('duitnow_id', e.target.value)}
                        required
                        autoComplete="duitnow_id"
                    />

                    <InputError className="mt-2" message={errors.duitnow_id} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="campus" value="Campus" />
                    <Select onValueChange={handleCampusChange} value={data.campus}>
                        <SelectTrigger className="w-[575px]">
                            <SelectValue placeholder="Select your Campus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UTM JOHOR BAHRU">UTM JOHOR BAHRU</SelectItem>
                            <SelectItem value="UTM KUALA LUMPUR">UTM KUALA LUMPUR</SelectItem>
                            <SelectItem value="UTM PAGOH">UTM PAGOH</SelectItem>
                        </SelectContent>
                    </Select>

                    <InputError className="mt-2" message={errors.campus} />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="faculty" value="Faculty" />
                    <Select onValueChange={handleFacultyChange} value={data.faculty}>
                        <SelectTrigger className="w-[575px]">
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

                    <InputError className="mt-2" message={errors.faculty} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
