// ID: 1
// Difficulty: Easy
// Tags: Array, Hash Table

// Time: O(n^2)
// Space: O(1)

export function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const num1 = nums[i];
            const num2 = nums[j];
            const areNumsDefined = num1 !== undefined && num2 !== undefined;

            if (!areNumsDefined) {
                continue;
            }
            const sum = num1 + num2;
            const isSumEqualTarget = sum === target;
            if (isSumEqualTarget) {
                return [i, j];
            }
        }
    }
    return [];
}

// Time: O(n)
// Space: O(n)

export function twoSumOptimized(nums: number[], target: number): number[] {
    const entries:[number, number][] = nums.map((num, index): [number, number] => [num, index])

    const numsMap: Record<number, number> = Object.fromEntries(entries);

    for (let i = 0; i < nums.length; i++) {
        const value: number | undefined = nums[i];
        if (value !== undefined) {
            const missingNumber: number = target - value;
            const secondIndex: number | undefined = numsMap[missingNumber];
            if (secondIndex !== undefined && secondIndex !== i) {
                return [i, secondIndex];
            }
        }
    }

    return []
}

export function twoSumAnswer(nums: number[], target: number): number[] {
    const numsMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const currentValue: number | undefined = nums[i]
        if (currentValue === undefined) {
            continue
        }
        const missingNumber = target - currentValue;
        const missingIndex = numsMap.get(missingNumber);

        if (missingIndex !== undefined) {
            return [i, missingIndex]
        }
        numsMap.set(currentValue, i)
    }

    return []
}
