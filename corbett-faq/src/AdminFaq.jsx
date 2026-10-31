"use client";

import { useState } from "react";

const InitialFAQs = [
    {
        id: "1",
        question: "What is Corbett House in the IITM BS Degree Programme?",
        answer:
            "Corbett House is an active student community within the IIT Madras BS Degree Programme. Embodying the spirit of the tiger, we foster academic excellence, leadership, inclusivity, and peer learning across our student network.",

        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "2",
        question: "How do I use and access the new platform features?",
        answer: " All new features—including the Project Showcase, Peer Mentorship portal, and Resource Vault—are available directly from the navigation header. Simply log in using your official student credentials code@ds.study.iitm.ac.in",
        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "3",
        question: "Are these tools and resources free for students?",
        answer:
            "Yes! All community features, study materials, project hubs, and peer mentorship initiatives provided on the Corbett House platform are 100% free for all active IITM BS students.",
        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "4",
        question: "How can I contribute my projects or study guides?",
        answer:
            'You can submit your open-source projects or study notes by clicking the "Submit Project / Resource" button in the member portal or by posting in our official discussion forums.',
        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "5",
        question: "Who do I contact for website feedback or bug reports?",
        answer:"For technical website issues or suggestion reports, email our Web Head Swarnabha Banerjee at corbett-webad@ds.study.iitm.ac.in or reach out to Secretary Yash Pandey at corbett-sec@ds.study.iitm.ac.in",
        published: true,
        created_at: "2026-10-20"
    },
];

export default function AdminFaq() {
    const [faqs, setFaqs] = useState(InitialFAQs);
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState(null);
    const [filter, setFilter] = useState("all");

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        published: true,
    });

    function resetForm() {
        setFormData({
            question: "",
            answer: "",
            published: true,
        });

        setEditingFAQ(null);
        setShowForm(false);
    }

    function openNewFAQ() {
        resetForm();
        setShowForm(true);
        setSelectedFAQ(null);
    }

    function startEditFAQ(faq) {
        setEditingFAQ(faq);

        setFormData({
            question: faq.question,
            answer: faq.answer,
            published: faq.published,
        });

        setShowForm(true);
        setSelectedFAQ(null);
    }

    function saveFAQ() {
        if (!formData.question.trim() || !formData.answer.trim()) {
            alert("Please enter both question and answer.");
            return;
        }

        if (editingFAQ) {
            setFaqs((current) =>
                current.map((faq) =>
                    faq.id === editingFAQ.id
                        ? {
                            ...faq,
                            question: formData.question,
                            answer: formData.answer,
                            published: formData.published,
                        }
                        : faq
                )
            );
        } else {
            const newFAQ = {
                id: Date.now().toString(),
                question: formData.question,
                answer: formData.answer,
                published: formData.published,
                created_at: new Date().toISOString(),
            };

            setFaqs((current) => [...current, newFAQ]);
        }

        resetForm();
    }

    function deleteFAQ(id) {
        if (!confirm("Delete this FAQ?")) return;

        setFaqs((current) => current.filter((faq) => faq.id !== id));

        if (selectedFAQ?.id === id) {
            setSelectedFAQ(null);
        }
    }

    function togglePublished(id) {
        setFaqs((current) =>
            current.map((faq) =>
                faq.id === id
                    ? { ...faq, published: !faq.published }
                    : faq
            )
        );

        if (selectedFAQ?.id === id) {
            setSelectedFAQ((faq) =>
                faq
                    ? {
                        ...faq,
                        published: !faq.published,
                    }
                    : null
            );
        }
    }

    const filteredFAQs = faqs.filter((faq) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "published" && faq.published) ||
            (filter === "draft" && !faq.published);

        return matchesFilter;
    });

    return (
        
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Header */}
                <header className="mb-8 border-b border-neutral-100 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <h1 className="text-3xl font-light text-neutral-900 tracking-tight">
                                FAQs
                            </h1>

                            <p className="text-neutral-500 mt-1 font-light">
                                Manage frequently asked questions for your platform
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 text-sm">

                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-tiger-orange-500 rounded-full" />

                                <span className="text-neutral-600">
                                    {faqs.length} questions
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />

                                <span className="text-neutral-600">
                                    {
                                        faqs.filter(
                                            (faq) => faq.published
                                        ).length
                                    }{" "}
                                    published
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Filters + New FAQ */}
                    <div className="mt-6 flex items-center justify-between">

                        {/* Filters */}
                        <div className="flex items-center gap-1">
                            {[
                                ["all", "All"],
                                ["published", "Published"],
                                ["draft", "Drafts"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    onClick={() => setFilter(value)}
                                    className={`px-4 py-2 text-sm font-medium transition-all ${filter === value
                                            ? "text-tiger-orange-600 border-b-2 border-tiger-orange-500"
                                            : "text-neutral-500 hover:text-neutral-700 border-b-2 border-transparent"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* New FAQ */}
                        <button
                            onClick={openNewFAQ}
                            className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                        >
                            New FAQ
                        </button>

                    </div>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* FAQ List */}
                    <section className="lg:col-span-2">

                        {filteredFAQs.length === 0 ? (

                            <div className="text-center py-16">

                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">

                                    <svg
                                        className="w-6 h-6 text-neutral-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8.228 9.247a4.75 4.75 0 117.544 0c-.67.86-1.76 1.503-2.522 2.086-.675.518-1.25 1.104-1.25 2.167v.25m0 3h.008"
                                        />
                                    </svg>

                                </div>

                                <p className="text-sm text-neutral-500 font-light">
                                    No FAQs found
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-1">

                                {filteredFAQs.map((faq) => {

                                    const isSelected =
                                        selectedFAQ?.id === faq.id;

                                    return (
                                        <div
                                            key={faq.id}
                                            onClick={() => {
                                                setSelectedFAQ(faq);
                                                setShowForm(false);
                                            }}
                                            className={`p-5 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${isSelected
                                                    ? "bg-tiger-orange-50 border-orange-500"
                                                    : "border-transparent hover:bg-neutral-50"
                                                }`}
                                        >

                                            <div className="flex items-start gap-4">

                                                <div className="flex-1 min-w-0">

                                                    <div className="flex items-start justify-between gap-3">

                                                        <h3
                                                            className={`text-sm font-medium ${isSelected
                                                                    ? "text-orange-900"
                                                                    : "text-neutral-900"
                                                                }`}
                                                        >
                                                            {faq.question}
                                                        </h3>

                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${faq.published
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-neutral-100 text-neutral-600"
                                                                }`}
                                                        >
                                                            {faq.published
                                                                ? "Published"
                                                                : "Draft"}
                                                        </span>

                                                    </div>

                                                    <p className="text-xs text-neutral-500 mt-2 line-clamp-2 font-light">
                                                        {faq.answer}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        )}

                    </section>

                    {/* Right Panel */}
                    <section>

                        {showForm ? (

                            /* Create / Edit Form */
                            <div className="bg-white border border-neutral-100 rounded-lg p-6 space-y-6">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-lg font-light text-neutral-900">
                                        {editingFAQ
                                            ? "Edit FAQ"
                                            : "New FAQ"}
                                    </h3>

                                    <button
                                        onClick={resetForm}
                                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                </div>

                                <div className="space-y-5">

                                    {/* Question */}
                                    <div>

                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Question
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.question}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    question: e.target.value,
                                                })
                                            }
                                            placeholder="Enter the question"
                                            className="w-full px-0 py-2 text-sm border-0 border-b border-neutral-200 focus:border-tiger-orange-500 focus:outline-none bg-transparent placeholder:text-neutral-400"
                                        />

                                    </div>

                                    {/* Answer */}
                                    <div>

                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Answer
                                        </label>

                                        <textarea
                                            value={formData.answer}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    answer: e.target.value,
                                                })
                                            }
                                            placeholder="Write the answer..."
                                            rows={6}
                                            className="w-full px-0 py-2 text-sm border-0 border-b border-neutral-200 focus:border-orange-500 focus:outline-none bg-transparent resize-none placeholder:text-neutral-400"
                                        />

                                    </div>

                                    {/* Publish */}
<div className="flex items-center justify-between pt-2">
    <div>
        <p className="text-sm font-medium text-neutral-700">
            Publish FAQ
        </p>

        <p className="text-xs text-neutral-400 mt-1">
            Make this question visible on the public website
        </p>
    </div>

    <button
        type="button"
        onClick={() =>
            setFormData((prev) => ({
                ...prev,
                published: !prev.published,
            }))
        }
        className={`relative w-10 h-5 rounded-full transition-colors ${
            formData.published
                ? "bg-orange-500"
                : "bg-neutral-300"
        }`}
    >
        <span
            className={`absolute top-0.5 left-0 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                formData.published
                    ? "translate-x-5"
                    : "translate-x-0.5"
            }`}
        />
    </button>
</div>

                                    {/* Save */}
                                    <button
                                        onClick={saveFAQ}
                                        disabled={
                                            !formData.question.trim() ||
                                            !formData.answer.trim()
                                        }
                                        className="w-full py-3 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                                    >
                                        {editingFAQ
                                            ? "Update FAQ"
                                            : "Create FAQ"}
                                    </button>

                                </div>

                            </div>

                        ) : selectedFAQ ? (

                            /* FAQ Details */
                            <div className="bg-white border border-neutral-100 rounded-lg p-6 space-y-6">

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-2">

                                        <div
                                            className={`w-2 h-2 rounded-full ${selectedFAQ.published
                                                    ? "bg-green-400"
                                                    : "bg-neutral-400"
                                                }`}
                                        />

                                        <span className="text-xs text-neutral-500 uppercase font-medium">
                                            {selectedFAQ.published
                                                ? "Published"
                                                : "Draft"}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-1">

                                        <button
                                            onClick={() =>
                                                startEditFAQ(selectedFAQ)
                                            }
                                            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
                                            title="Edit FAQ"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteFAQ(selectedFAQ.id)
                                            }
                                            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                            title="Delete FAQ"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 01-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>

                                    </div>

                                </div>

                                <div>

                                    <span className="text-neutral-500 text-xs font-medium">
                                        Question
                                    </span>

                                    <h3 className="text-xl font-light text-neutral-900 mt-2">
                                        {selectedFAQ.question}
                                    </h3>

                                </div>

                                <div>

                                    <span className="text-neutral-500 text-xs font-medium">
                                        Answer
                                    </span>

                                    <p className="text-sm text-neutral-700 mt-2 leading-6 font-light">
                                        {selectedFAQ.answer}
                                    </p>

                                </div>

                                {/* Visibility */}
                                <div className="pt-4 border-t border-neutral-100">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <span className="text-neutral-500 text-xs font-medium">
                                                Visibility
                                            </span>

                                            <p className="text-sm text-neutral-800 mt-1">
                                                {selectedFAQ.published
                                                    ? "Visible on public website"
                                                    : "Hidden from public website"}
                                            </p>

                                        </div>

                                        <button
                                            onClick={() =>
                                                togglePublished(
                                                    selectedFAQ.id
                                                )
                                            }
                                            className={`px-3 py-2 text-xs font-medium rounded-lg ${selectedFAQ.published
                                                    ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                                    : "bg-orange-500 text-white hover:bg-orange-600"
                                                }`}
                                        >
                                            {selectedFAQ.published
                                                ? "Unpublish"
                                                : "Publish"}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            /* Empty State */
                            <div className="h-96 flex flex-col items-center justify-center text-center border-2 border-dashed border-neutral-200 rounded-lg">

                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">

                                    <svg
                                        className="w-8 h-8 text-neutral-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8.228 9.247a4.75 4.75 0 117.544 0c-.67.86-1.76 1.503-2.522 2.086-.675.518-1.25 1.104-1.25 2.167v.25m0 3h.008"
                                        />
                                    </svg>

                                </div>

                                <h3 className="text-lg font-light text-neutral-900 mb-2">
                                    Select an FAQ
                                </h3>

                                <p className="text-sm text-neutral-500 font-light max-w-xs">
                                    Choose an FAQ from the list to view, edit,
                                    publish or delete it
                                </p>

                            </div>

                        )}

                    </section>

                </div>

            </div>
        </div>
    );
}