interface LoadingProps {
  text?: string;
}

export default function Loading({ text }: LoadingProps) {
  return (
    <div className="flex items-center justify-center gap-2 dark:text-shade-gray text-lg text-tint-gray font-medium">
      <div className="w-4 h-4 border-2 dark:border-shade-gray border-white border-t-transparent rounded-full animate-spin"></div>
      {text ?? ''}
    </div>
  );
}
