import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

export type CardColor = 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple' | 'cyan' | 'blue';

interface CardInfoProps {
    icon: LucideIcon;
    title: string;
    status: string;
    value: string;
    color?: CardColor;
}

const colorStyles: Record<CardColor, {
    iconBg: string;
    iconText: string;
    iconRing: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
}> = {
    emerald: {
        iconBg: 'bg-emerald-500/10',
        iconText: 'text-emerald-400',
        iconRing: 'ring-emerald-500/20',
        badgeBg: 'bg-emerald-500/10 hover:bg-emerald-500/10',
        badgeBorder: 'border-emerald-500/20',
        badgeText: 'text-emerald-300',
    },
    amber: {
        iconBg: 'bg-amber-500/10',
        iconText: 'text-amber-400',
        iconRing: 'ring-amber-500/20',
        badgeBg: 'bg-amber-500/10 hover:bg-amber-500/10',
        badgeBorder: 'border-amber-500/20',
        badgeText: 'text-amber-300',
    },
    rose: {
        iconBg: 'bg-rose-500/10',
        iconText: 'text-rose-400',
        iconRing: 'ring-rose-500/20',
        badgeBg: 'bg-rose-500/10 hover:bg-rose-500/10',
        badgeBorder: 'border-rose-500/20',
        badgeText: 'text-rose-300',
    },
    indigo: {
        iconBg: 'bg-indigo-500/10',
        iconText: 'text-indigo-400',
        iconRing: 'ring-indigo-500/20',
        badgeBg: 'bg-indigo-500/10 hover:bg-indigo-500/10',
        badgeBorder: 'border-indigo-500/20',
        badgeText: 'text-indigo-300',
    },
    purple: {
        iconBg: 'bg-purple-500/10',
        iconText: 'text-purple-400',
        iconRing: 'ring-purple-500/20',
        badgeBg: 'bg-purple-500/10 hover:bg-purple-500/10',
        badgeBorder: 'border-purple-500/20',
        badgeText: 'text-purple-300',
    },
    cyan: {
        iconBg: 'bg-cyan-500/10',
        iconText: 'text-cyan-400',
        iconRing: 'ring-cyan-500/20',
        badgeBg: 'bg-cyan-500/10 hover:bg-cyan-500/10',
        badgeBorder: 'border-cyan-500/20',
        badgeText: 'text-cyan-300',
    },
    blue: {
        iconBg: 'bg-blue-500/10',
        iconText: 'text-blue-400',
        iconRing: 'ring-blue-500/20',
        badgeBg: 'bg-blue-500/10 hover:bg-blue-500/10',
        badgeBorder: 'border-blue-500/20',
        badgeText: 'text-blue-300',
    },
};

export default function CardInfo({
                                     icon: Icon,
                                     title,
                                     status,
                                     value,
                                     color = 'amber',
                                 }: CardInfoProps) {
    const styles = colorStyles[color] || colorStyles.amber;

    return (
        <Card className="rounded-3xl border border-white/5 bg-slate-900/20 shadow-xl backdrop-blur-xl transition-all hover:bg-slate-900/30 hover:shadow-2xl">
            <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText} ring-1 ${styles.iconRing}`}>
                        <Icon className="h-7 w-7" />
                    </div>

                    <Badge className={`rounded-full border ${styles.badgeBorder} ${styles.badgeBg} px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${styles.badgeText}`}>
                        {status}
                    </Badge>
                </div>

                <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                        {value}
                    </h3>
                </div>
            </CardContent>
        </Card>
    );
}
