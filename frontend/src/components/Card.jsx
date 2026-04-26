import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { useMutation } from "@apollo/client/react";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation.js";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query.js";
import { toast } from "react-hot-toast";
import { formatDate } from "../utils/formatDate.js";

// const getCategoryColor = (category) => {
//   switch (category?.toLowerCase()) {
//     case "saving":
//       return "bg-gradient-to-br from-green-700 to-green-400";

//     case "investment":
//       return "bg-gradient-to-br from-blue-700 to-blue-400";

//     case "expense":
//       return "bg-gradient-to-br from-pink-800 to-pink-600";

//     default:
//       return "bg-gradient-to-br from-gray-700 to-gray-500";
//   }
// };

const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};


const Card = ({ transactions }) => {
	let { category, amount, location, date, paymentType, description } = transactions;
	const cardClass = categoryColorMap[category];
	const formattedDate = formatDate(date);

	const [deleteTransaction, { loading, error }] = useMutation(DELETE_TRANSACTION, {
		variables: {
			transactionId: transactions._id
		},
		refetchQueries: [GET_TRANSACTION]
	});

	const handleDelete = async() => {
		try {
			await deleteTransaction();
			toast.success("Transaction deleted successfully!");
		} catch (error) {
			console.error("Error deleting transaction:", error);
			toast.error("Failed to delete transaction. Please try again.");
		}
	};
		

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						{!loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
						{loading && <div className='w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin'></div>}
						<Link to={`/transaction/${transactions._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: ${amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location || "N/A"}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{formattedDate}</p>
					<img src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"} className='h-8 w-8 border rounded-full' alt='' />
				</div>
			</div>
		</div>
	);
};
export default Card;