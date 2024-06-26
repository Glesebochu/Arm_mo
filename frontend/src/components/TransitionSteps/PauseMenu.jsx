import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Target, Mountain } from 'lucide-react'

export function PauseMenu({ onEnd, onViewInfo, onShowGoals, onNextStage }) {
    const commonStyles = "h-20 text-xl w-full";
    const variant = "outline";
    const iconClasses = "mr-3"
    return (
        <div className="flex flex-col gap-4 p-8 w-1/2 h-full items-center justify-center">
            <Button variant={variant} onClick={onEnd} className={commonStyles}>
                <X className={iconClasses} />
                End Meditation
            </Button>
            <Button variant={variant} onClick={onViewInfo} className={commonStyles}>
                <Target className={iconClasses} />
                Current Stage
            </Button>
            <Button variant={variant} onClick={onShowGoals} className={commonStyles}>
                <Mountain className={iconClasses} />
                Goals
            </Button>
            {/* <Button onClick={onNextStage} className="h-24 text-xl">Go to Next Stage</Button> */}
        </div>
    );
}
