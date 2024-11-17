'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill } from '@/components/Shared/pill';
import { Icon } from '@/components/UI/icon';
import { ToggleGroup, ToggleGroupItem } from '@/components/UI/toggle-group';

interface SwitcherProps {
  data: { label: string; value: string }[];
  onChange: (value: string) => void; // Update to receive a single string
  value: string; // Single value instead of array
  state: 'collapsed' | 'open';
}

const Switcher: React.FC<SwitcherProps> = ({
  data, onChange, value, state
}) => {
  const [isExpanded, setIsExpanded] = useState(state === 'open');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsExpanded(state === 'open');
  }, [state]);

  const handleValueChange = (newValue: string) => {
    if (newValue !== "") {
      onChange(newValue);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => state !== 'open' && setIsExpanded(false)}
    >
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={handleValueChange}
        className="flex bg-[#1A2333] rounded-full p-2 gap-4 relative overflow-hidden"
      >
        <motion.div
          className="flex gap-4 items-center"
          initial={false}
          animate={{
            width: isExpanded ? 'auto' : '200px',
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          {data.map((item, index) => (
            <motion.div
              key={item.value}
              initial={false}
              animate={{
                opacity: isExpanded || index < 2 ? 1 : 0,
                x: isExpanded || index < 2 ? 0 : 20,
              }}
              transition={{
                duration: 0.2,
                delay: isExpanded ? index * 0.05 : 0,
              }}
            >
              <ToggleGroupItem variant="outline" asChild value={item.value}>
                <Pill
                  className="cursor-pointer whitespace-nowrap"
                  state={value === item.value ? 'selected' : 'default'}
                >
                  {item.label}
                </Pill>
              </ToggleGroupItem>
            </motion.div>
          ))}
        </motion.div>
      </ToggleGroup>
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <Pill state="default">
              <Icon.ChevronDoubleRight className="size-4" />
            </Pill>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Switcher;
