import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircleOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <MessageCircleOff className="text-indigo-600 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          The page you have requested for could not be found
        </p>

        {/* Back button */}
        <Link to="/">
          <Button className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-3 flex items-center gap-2 mx-auto">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
