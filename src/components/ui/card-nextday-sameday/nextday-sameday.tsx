// src/components/ui/card-nextday-sameday/nextday-sameday.tsx
import { NextdayDiatas12 } from "./NextdayDiatas12"
import { NextdayDibawah12 } from "./NextdayDibawah12"
import { SamedayDiatas12 } from "./SamedayDiatas12"
import { SamedayDibawah12 } from "./SamedayDibawah12"

export const NextDaySameDay = () => {

    return (
        <>
            {/* Date Picker and Submit Button */}


            <div className="grid grid-rows-2 gap-6">
                {/* Row 1: NextDay */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-2 rounded shadow">
                        <h1 className="text-xl font-bold text-center bg-red-400">NextDay &#60; 12</h1>
                        <NextdayDibawah12 />
                    </div>
                    <div className="border p-2 rounded shadow">
                        <h1 className="text-xl font-bold text-center bg-red-400">NextDay &#62; 12</h1>
                        <NextdayDiatas12 />
                    </div>
                </div>

                {/* Row 2: SameDay */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-2 rounded shadow">
                        <h1 className="text-xl font-bold text-center bg-orange-400">SameDay &#60; 12</h1>
                        <SamedayDibawah12 />
                    </div>
                    <div className="border p-2 rounded shadow">
                        <h1 className="text-xl font-bold text-center bg-orange-400">SameDay &#62; 12</h1>
                        <SamedayDiatas12 />
                    </div>
                </div>
            </div>
        </>

    )
}