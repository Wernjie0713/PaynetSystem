import { useState, useEffect } from "react";
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputLabel from '@/Components/InputLabel';
import CumulativeLeaderboardTable from './CumulativeLeaderboardTable';
import MonthlyLeaderboardTable from './MonthlyLeaderboardTable';
import WeeklyLeaderboardTable from './WeeklyLeaderboardTable';
import FacultyRankingTable from './FacultyRankingTable';

export default function AdminDashboard({ weekly, monthly, cumulative, facultyRanking, current_user, isAdmin, weeklyAll, monthlyAll, cumulativeAll }) {
    const [selectedValue, setSelectedValue] = useState<string>(() => {
        const saved = localStorage.getItem("selectedValue");
        return saved !== null ? saved : '';
    });
    const [selectedTime, setSelectedTime] = useState<number>(() => {
        const saved = localStorage.getItem("selectedTime");
        return saved !== null ? Number(saved) : 0;
    });
    const [selectedNumber, setSelectedNumber] = useState<number>(() => {
        const saved = localStorage.getItem("selectedNumber");
        return saved !== null ? Number(saved) : 10;
    });

    const handleSelectedChange = (value: string) => {
        setSelectedValue(value);
        localStorage.setItem("selectedValue", value.toString());
        setSelectedTime(0);
    };

    const handleSelectedTime = (value: number) => {
        setSelectedTime(value);
        localStorage.setItem("selectedTime", value.toString());
    }
        
    const handleSelectedNumber = (value: number) => {
        setSelectedNumber(value);
        localStorage.setItem("selectedNumber", value.toString());
    };

    useEffect(() => {
        const savedTime = localStorage.getItem("selectedTime");
        if (savedTime !== null) {
            setSelectedTime(Number(savedTime));
        }
    }, [selectedValue]);
    
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className='bg-white rounded-lg shadow p-4 sm:p-6 max-w-md'>
                <InputLabel htmlFor={selectedValue} value="Filter Table" className="mb-2 pl-1 font-semibold"/>
                <Select onValueChange={handleSelectedChange} value={selectedValue}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select table"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Cumulative">Cumulative</SelectItem>
                        <SelectItem value="FacultyRanking">Faculty Ranking</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-4 gap-4">
                    {(selectedValue === 'Weekly') && (
                        <Select onValueChange={handleSelectedTime} value={selectedTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Week Number"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={1}>Week 1</SelectItem>
                                <SelectItem value={2}>Week 2</SelectItem>
                                <SelectItem value={3}>Week 3</SelectItem>
                                <SelectItem value={4}>Week 4</SelectItem>
                                <SelectItem value={5}>Week 5</SelectItem>
                                <SelectItem value={6}>Week 6</SelectItem>
                                <SelectItem value={7}>Week 7</SelectItem>
                                <SelectItem value={8}>Week 8</SelectItem>
                                <SelectItem value={9}>Week 9</SelectItem>
                                <SelectItem value={10}>Week 10</SelectItem>
                                <SelectItem value={11}>Week 11</SelectItem>
                                <SelectItem value={12}>Week 12</SelectItem>
                                <SelectItem value={13}>Week 13</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {(selectedValue === 'Monthly') && (
                        <Select onValueChange={handleSelectedTime} value={selectedTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Month"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={10}>October</SelectItem>
                                <SelectItem value={11}>November</SelectItem>
                                <SelectItem value={12}>December</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {(selectedValue === 'Weekly' || selectedValue === 'Monthly' || selectedValue === 'Cumulative') && (
                        <Select onValueChange={handleSelectedNumber} value={selectedNumber}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select number"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={10}>Top 10</SelectItem>
                                <SelectItem value={100}>Top 100</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>

            </div>

            <div className='bg-white rounded-lg shadow p-4 sm:p-6 mt-6'>
                {selectedValue === 'Weekly' && 
                    (
                        <WeeklyLeaderboardTable 
                            users={weekly.data} 
                            links={weekly.links} 
                            current_user={current_user} 
                            isAdmin={isAdmin} 
                            selectedNumber={selectedNumber} 
                            selectedTime={selectedTime}
                            weeklyAll={weeklyAll} 
                        />
                    )
                }
                
                {selectedValue === 'Monthly' && 
                    (
                        <MonthlyLeaderboardTable 
                            users={monthly.data}
                            links={monthly.links}  
                            current_user={current_user} 
                            isAdmin={isAdmin} 
                            selectedNumber={selectedNumber}
                            selectedTime={selectedTime}
                            monthlyAll={monthlyAll} 
                        />
                    )
                }
                {selectedValue === 'Cumulative' && 
                    (
                        <CumulativeLeaderboardTable 
                            users={cumulative.data} 
                            links={cumulative.links}  
                            current_user={current_user} 
                            isAdmin={isAdmin} 
                            selectedNumber={selectedNumber} 
                            title="Cumulative Top 10" 
                            duration="October 6th, 2024 (12:00 a.m) - December 31th, 2024 (11:59 p.m)"
                            cumulativeAll={cumulativeAll}
                        />
                    )
                }
                {selectedValue === 'FacultyRanking' && (
                    <FacultyRankingTable faculties={facultyRanking} />
                )}
            </div>
        </div>
    );
}