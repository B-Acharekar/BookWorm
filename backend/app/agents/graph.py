from langgraph.graph import StateGraph, END
from app.models.schemas import AgentState
from app.agents.router import router_node
from app.agents.recommendation_agent import recommendation_agent
from app.agents.events_agent import events_agent
from app.agents.sales_agent import sales_agent
from app.agents.chat_agent import chat_agent

def create_graph():
    workflow = StateGraph(AgentState)

    # Add Nodes
    workflow.add_node("router", router_node)
    workflow.add_node("recommendation", recommendation_agent)
    workflow.add_node("events", events_agent)
    workflow.add_node("sales", sales_agent)
    workflow.add_node("chat", chat_agent)

    # Set Entry Point
    workflow.set_entry_point("router")

    # Add Conditional Edges
    workflow.add_conditional_edges(
        "router",
        lambda x: x.intent,
        {
            "recommendation": "recommendation",
            "events": "events",
            "sales": "sales",
            "chat": "chat"
        }
    )

    # All roads lead to END
    workflow.add_edge("recommendation", END)
    workflow.add_edge("events", END)
    workflow.add_edge("sales", END)
    workflow.add_edge("chat", END)

    return workflow.compile()

# Singleton instance of the graph
bookworm_graph = create_graph()
