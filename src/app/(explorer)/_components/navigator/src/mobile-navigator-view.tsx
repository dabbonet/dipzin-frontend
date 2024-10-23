"use client";

import React, { useState } from "react";
import { Input } from "@/components/Shared/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { AppPill } from "@/app/(explorer)/_components/navigator/selected-apps";
import MobileNavigatorMenu from "./mobile-navigator-menu";
import { useKeyword } from "@/app/(explorer)/_hooks/useKeyword";
import { useQuery } from "@/app/(explorer)/_hooks/useQuery";

const patterns = [
  { label: "Apps", value: "apps" },
  { label: "Screens", value: "screens" },
  { label: "Components", value: "components" },
  { label: "Marketing", value: "marketing" },
  { label: "Flows", value: "flows" },
];

const platforms = [
  { label: "IOS", value: "ios" },
  { label: "Android", value: "android" },
  { label: "Web", value: "web" },
];

const MobileNavigatorView: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { keyword, setKeyword } = useKeyword();
  const {
    query, setFilters, setPattern, setPlatform, setApps
  } = useQuery();
  const { filters, platform, pattern } = query || {};

  return (
    <div
      key="mobile-navigator"
      className="size-full bg-gradient-to-b from-slate-900/85 to-slate-900/60 rounded-[1.625rem] p-2.5 flex flex-col gap-4"
    >
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setIsMenuOpen(true)}
        className="w-full shadow-none"
        type="search"
        placeholder={filters?.length > 0 ? "Search" : "Try Search"}
        autoComplete="off"
      />
      <div className="w-full flex gap-4">
        <Select value={pattern} onValueChange={setPattern}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select pattern" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {patterns.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {platforms.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {isMenuOpen && (
        <MobileNavigatorMenu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          handleUpdate={(updateFn, target) => {
            if (target === 'filters') {
              setFilters((prevFilters) => updateFn(prevFilters)); // Updates filters
            } else if (target === 'apps') {
              setApps((prevApps) => updateFn(prevApps)); // Updates apps
            }
          }}
        />
      )}

      {!isMenuOpen && query?.apps?.length > 0 && (
        <div className="size-full flex gap-4">
          {query.apps.map((app: any, index: number) => (
            <AppPill key={app.id || index} data={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavigatorView;
